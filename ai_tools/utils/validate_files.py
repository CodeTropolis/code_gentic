from pathlib import Path

from ai_tools.types.generated_file import GeneratedFile

REQUIRED_FILES = {
    "page": [".page.ts", ".page.html", ".page.scss", ".page.spec.ts"],
    "component": [".component.ts", ".component.html", ".component.scss", ".component.spec.ts"],
    "service": [".service.ts", ".service.spec.ts"],
}


def validate_files(files: list["GeneratedFile"], artifact: str):
    if not files:
        raise ValueError("Model returned zero files.")

    if artifact not in REQUIRED_FILES:
        raise ValueError(f"Unknown artifact type: {artifact}")

    names = {Path(f.path).name for f in files}

    for suffix in REQUIRED_FILES[artifact]:
        if not any(n.endswith(suffix) for n in names):
            raise ValueError(f"Missing {suffix} file")
