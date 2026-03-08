#!/usr/bin/env python3

"""
Generate a minimal Angular (standalone) + Ionic login page using an LLM
and write the files into the Angular project.

Run from project root:

    python -m ai_tools.login.generate_login_screen
"""

import json
import re
from dataclasses import dataclass
from pathlib import Path

from ai_tools.utils.project_root import find_project_root
from ai_tools.utils.openai_client import generate


# --------------------------------------------------
# DATA STRUCTURES
# --------------------------------------------------

@dataclass
class GeneratedFile:
    path: str
    content: str


# --------------------------------------------------
# HELPERS
# --------------------------------------------------

def strip_markdown_fences(text: str) -> str:
    """Remove ``` fences if the model returns them."""
    text = re.sub(r"```[a-zA-Z]*\n?", "", text)
    return text.replace("```", "").strip()


def write_file(abs_path: Path, content: str):
    abs_path.parent.mkdir(parents=True, exist_ok=True)
    abs_path.write_text(content, encoding="utf-8")


def validate_files(files: list[GeneratedFile]):
    if not files:
        raise ValueError("Model returned zero files.")

    names = {Path(f.path).name for f in files}

    if not any(n.endswith(".page.ts") for n in names):
        raise ValueError("Missing .page.ts file")

    if not any(n.endswith(".page.html") for n in names):
        raise ValueError("Missing .page.html file")

    if not any(n.endswith(".page.scss") for n in names):
        raise ValueError("Missing .page.scss file")


# --------------------------------------------------
# PROMPT
# --------------------------------------------------

def login_prompt() -> str:
    return """
You are generating code for an EXISTING Ionic Angular app using the latest Angular + Ionic patterns.

GOAL:
Create a minimal proof-of-concept Login page implemented as an Ionic page using:

- Angular standalone component (standalone: true)
- Ionic standalone components
- Reactive Forms (FormBuilder/FormGroup)
- Angular control flow syntax (@if)
- Email + password fields
- Validators: required + email
- Disable submit button when invalid
- Simple submit handler that logs the form value

UI:
- ion-header / ion-toolbar / ion-title
- ion-content
- ion-item
- ion-input
- ion-button
- ion-text

OUTPUT FORMAT (STRICT):

Return ONLY JSON with this structure:

{
  "files": [
    { "path": "src/app/pages/login/login.page.ts", "content": "..." },
    { "path": "src/app/pages/login/login.page.html", "content": "..." },
    { "path": "src/app/pages/login/login.page.scss", "content": "..." }
    { "path": "src/app/pages/login/login.page.spec.ts", "content": "..." }
  ],
  "notes": "optional"
}

RULES:
- No markdown fences
- No text outside JSON
- Must compile in an Angular Ionic project
""".strip()


# --------------------------------------------------
# MAIN GENERATION LOGIC
# --------------------------------------------------

SCRIPT_PATH = Path(__file__).resolve()
PROJECT_ROOT = find_project_root(SCRIPT_PATH)


def main():
    print("Generating login page...")

    raw = generate(login_prompt())
    raw = strip_markdown_fences(raw)

    payload = json.loads(raw)

    files = [GeneratedFile(**f) for f in payload["files"]]

    validate_files(files)

    for f in files:
        write_file(PROJECT_ROOT / f.path, f.content)

    print(f"✅ Generated {len(files)} files")

    if "notes" in payload:
        print("\nNotes from model:")
        print(payload["notes"])


# --------------------------------------------------
# ENTRY POINT
# --------------------------------------------------

if __name__ == "__main__":
    main()
