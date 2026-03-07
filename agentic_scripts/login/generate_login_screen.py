#!/usr/bin/env python3
"""
Generate a minimal Angular (standalone) + Ionic login page (Reactive Forms)
and write it into an existing Ionic Angular project.

Run from project root:
  python3 tools/generate_login_poc.py
"""

from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from openai import OpenAI

from pathlib import Path


def find_project_root(start: Path) -> Path:
    """
    Walk upward from `start` until we find an Angular workspace root.
    We treat the folder containing `angular.json` as the project root.
    """
    current = start
    while True:
        if (current / "angular.json").exists():
            return current
        if current.parent == current:
            break
        current = current.parent

    raise RuntimeError(
        "Could not find Angular project root. Expected to find angular.json in a parent folder."
    )

# ----------------------------
# CONFIG
# ----------------------------


# match whatever your account supports
MODEL = os.getenv("OPENAI_MODEL", "gpt-5.2")
# Use the folder containing the generator script as the starting point.
PROJECT_ROOT = find_project_root(Path(__file__).resolve())
OUT_DIR = PROJECT_ROOT / "src" / "app" / "pages" / "login"

# If you use a different routing setup, you'll paste the snippet manually.
# The generator will still create a working page component.
APP_ROUTES_PATH = PROJECT_ROOT / "src" / "app" / "app.routes.ts"

# ----------------------------
# DATA SHAPES
# ----------------------------


@dataclass
class GeneratedFile:
    path: str
    content: str


def _strip_markdown_fences(s: str) -> str:
    # Defensive cleanup if the model ignores instructions
    s = re.sub(r"```[a-zA-Z]*\n?", "", s)
    return s.replace("```", "").strip()


def _safe_write_file(abs_path: Path, content: str) -> None:
    abs_path.parent.mkdir(parents=True, exist_ok=True)
    abs_path.write_text(content, encoding="utf-8")


def _basic_validate(files: list[GeneratedFile]) -> None:
    if not files:
        raise ValueError("Model returned zero files.")

    present = {p.name for p in [Path(f.path) for f in files]}
    if not any(name.endswith(".page.ts") for name in present):
        raise ValueError("Missing .page.ts file")
    if not any(name.endswith(".page.html") for name in present):
        raise ValueError("Missing .page.html file")
    if not any(name.endswith(".page.scss") for name in present):
        raise ValueError("Missing .page.scss file")

    # Ensure reactive forms appear in TS
    ts = next((f.content for f in files if f.path.endswith(".page.ts")), "")
    if "FormBuilder" not in ts and "FormGroup" not in ts:
        raise ValueError(
            "TS file doesn't appear to use Reactive Forms (FormBuilder/FormGroup not found).")

    # Ensure standalone component
    if "standalone: true" not in ts:
        raise ValueError(
            "TS file doesn't appear to be a standalone component (standalone: true not found).")


def _prompt_for_login_page() -> str:
    """
    Ask for a minimal login page using:
    - Angular standalone component
    - Ionic standalone imports (IonInput, IonButton, etc.)
    - Reactive Forms with email/password + required validators
    - A very simple submit handler
    - Provide a routing snippet as a comment (not required to write)
    """
    return f"""
You are generating code for an EXISTING Ionic Angular app using the latest Angular + Ionic patterns.

GOAL:
Create a minimal proof-of-concept Login page implemented as an Ionic page using:
- Angular standalone component (standalone: true)
- ASSUME the project uses Angular standalone APIs and Ionic standalone components (no NgModules).
- Reactive Forms (FormBuilder/FormGroup)
- Use Angular's new Angular control flow syntax where possible. Example:
@if (loginForm.controls.email.invalid && loginForm.controls.email.touched) {{
  <ion-text color="danger">Valid email is required</ion-text>
}}
- Ionic UI (ion-header/ion-toolbar/ion-title/ion-content, ion-item, ion-input, ion-button, ion-text)
- Basic validators: required for both, email validator for email
- A submit handler that logs the form value (do NOT implement real auth)
- Disable submit button when invalid
- Show small inline validation messages after submit attempt (or after touched)

OUTPUT FORMAT (STRICT):
Return ONLY valid JSON with this shape:

{{
  "files": [
    {{ "path": "src/app/pages/login/login.page.ts", "content": "..." }},
    {{ "path": "src/app/pages/login/login.page.html", "content": "..." }},
    {{ "path": "src/app/pages/login/login.page.scss", "content": "..." }}
  ],
  "notes": "Optional short notes, including a snippet to add a /login route to app.routes.ts"
}}

RULES:
- No markdown fences.
- Do not include any text outside the JSON.
- Paths MUST be exactly under src/app/pages/login/ as shown.
- Use Ionic standalone imports (from @ionic/angular/standalone) and CommonModule + ReactiveFormsModule.
- Keep it minimal and compiling.
""".strip()


def generate() -> dict[str, Any]:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY environment variable not set.")

    client = OpenAI()

    # Responses API (recommended). :contentReference[oaicite:1]{index=1}
    resp = client.responses.create(
        model=MODEL,
        input=[
            {
                "role": "user",
                "content": _prompt_for_login_page(),
            }
        ],
        temperature=0.2,
        max_output_tokens=2500,
    )

    # SDKs may expose output text differently; handle common cases.
    text = getattr(resp, "output_text", None)
    if not text:
        # Fallback: try to stitch from resp.output items
        try:
            chunks: list[str] = []
            for item in resp.output:
                for c in getattr(item, "content", []) or []:
                    t = getattr(c, "text", None)
                    if t:
                        chunks.append(t)
            text = "\n".join(chunks).strip()
        except Exception:
            text = ""

    text = _strip_markdown_fences(text)
    if not text:
        raise RuntimeError("No text returned from model.")

    return json.loads(text)


def main() -> None:
    payload = generate()

    files_raw = payload.get("files", [])
    if not isinstance(files_raw, list):
        raise ValueError("JSON payload missing 'files' array.")

    files: list[GeneratedFile] = []
    for f in files_raw:
        if not isinstance(f, dict) or "path" not in f or "content" not in f:
            raise ValueError(
                "Each file entry must be an object with 'path' and 'content'.")
        files.append(GeneratedFile(path=f["path"], content=f["content"]))

    _basic_validate(files)

    # Write files
    for f in files:
        abs_path = PROJECT_ROOT / f.path
        _safe_write_file(abs_path, f.content)

    print(f"✅ Wrote {len(files)} file(s):")
    for f in files:
        print(f" - {f.path}")

    notes = payload.get("notes")
    if notes:
        print("\n--- NOTES FROM GENERATOR ---")
        print(notes)

    # Optional: gently remind about routing
    if APP_ROUTES_PATH.exists():
        print(
            f"\nℹ️  If you don't already have it, add a route in: {APP_ROUTES_PATH}")
    else:
        print("\nℹ️  Couldn't find src/app/app.routes.ts in the expected location; add the /login route where your routes live.")


if __name__ == "__main__":
    main()
