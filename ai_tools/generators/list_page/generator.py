"""
Generate a minimal Angular (standalone) + Ionic list page using an LLM
and write the files into the Angular project.

Run from project root:

    python -m ai_tools.generators.list_page.generator
"""

import json
from pathlib import Path

from ai_tools.generators.list_page.prompt import list_prompt
from ai_tools.types.generated_file import GeneratedFile
from ai_tools.utils.openai_client import generate
from ai_tools.utils.project_root import find_project_root
from ai_tools.utils.spinner import Spinner
from ai_tools.utils.strip_markdown_fences import strip_markdown_fences
from ai_tools.utils.validate_files import validate_files
from ai_tools.utils.write_file import write_file

# Receive input from user concerning the type of list page to generate.


def ask_list_type() -> str:
    print("\nWhat type of list would you like to generate?\n")
    print("Examples:")
    print("  users")
    print("  contacts")
    print("  products")
    print("  blank rows\n")

    return input("List type: ").strip()


def generate_list_page():

    # A variable to hold the list type (e.g. "users", "contacts", "products", etc.)
    list_type = ask_list_type()

    # Grab the prompt from the prompt.py file,
    # passing in the list type to customize it.
    prompt = list_prompt(list_type)

    spinner = Spinner()
    spinner.start()

    # Call the generate function, passing in the prompt, to get the LLM's response.
    content = generate(prompt)

    # Remove ```json ``` wrappers if model adds them
    content = strip_markdown_fences(content)

    # Debug output to diagnose JSON issues
    # print("\n----- RAW LLM OUTPUT (first 1500 chars) -----\n")
    # print(content[:1500])
    # print("\n---------------------------------------------\n")

    # Attempt to parse the LLM's response as JSON.
    # If it fails, print an error message and exit.
    try:
        if not content.strip().endswith("}"):
            print("\n❌ LLM output appears truncated\n")
            return
        data = json.loads(content)
    except json.JSONDecodeError as e:
        print("\n❌ Failed to parse JSON from LLM response\n")
        print(e)
        return

    files = [GeneratedFile(**f) for f in data["files"]]
    # This syntax is a shorthand for creating a list of
    # GeneratedFile objects from the JSON data.
    # Here's the long-hand version:

    # files = []
    # for f in data["files"]:
    #     generated_file = GeneratedFile(
    #         path=f["path"],
    #         content=f["content"]
    #     )
    #     files.append(generated_file)

    validate_files(files, "page")

    root = find_project_root(Path.cwd())

    for file in files:
        abs_path = root / file.path
        write_file(abs_path, file.content)

    spinner.stop()
    print("\n✅ List page generated successfully\n")

    if "notes" in data:
        print(data["notes"])


if __name__ == "__main__":
    generate_list_page()
