
from pathlib import Path


def write_file(abs_path: Path, content: str):
    abs_path.parent.mkdir(parents=True, exist_ok=True)
    abs_path.write_text(content, encoding="utf-8")
