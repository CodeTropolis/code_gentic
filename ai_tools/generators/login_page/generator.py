#!/usr/bin/env python3

"""
Generate a minimal Angular (standalone) + Ionic login page using an LLM
and write the files into the Angular project.

Run from project root:

    python -m ai_tools.generators.login_page.generator
"""

import json
from pathlib import Path

from ai_tools.generators.login_page.prompt import login_prompt
from ai_tools.types.generated_file import GeneratedFile
from ai_tools.utils.paths import PROJECT_ROOT
from ai_tools.utils.strip_markdown_fences import strip_markdown_fences
from ai_tools.utils.write_file import write_file
from ai_tools.utils.validate_files import validate_files
from ai_tools.utils.openai_client import generate

# --------------------------------------------------
# MAIN GENERATION LOGIC
# --------------------------------------------------


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
