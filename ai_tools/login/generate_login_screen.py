#!/usr/bin/env python3

"""
Generate a minimal Angular (standalone) + Ionic login page using an LLM
and write the files into the Angular project.

Run from project root:

    python -m ai_tools.login.generate_login_screen
"""

import json
import re
from pathlib import Path

from ai_tools.login.prompt import login_prompt
from ai_tools.types.generated_file import GeneratedFile
from ai_tools.utils.validate_files import validate_files
from ai_tools.utils.project_root import find_project_root
from ai_tools.utils.openai_client import generate


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


# def validate_files(files: list[GeneratedFile]):
    # if not files:
    # raise ValueError("Model returned zero files.")

    # names = {Path(f.path).name for f in files}

    # if not any(n.endswith(".page.ts") for n in names):
    # raise ValueError("Missing .page.ts file")

    # if not any(n.endswith(".page.html") for n in names):
    # raise ValueError("Missing .page.html file")

    # if not any(n.endswith(".page.scss") for n in names):
    # raise ValueError("Missing .page.scss file")

    # if not any(n.endswith(".page.spec.ts") for n in names):
    # raise ValueError("Missing .page.spec.ts file")


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

    validate_files(files, "page")

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
