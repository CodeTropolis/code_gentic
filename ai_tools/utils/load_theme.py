from pathlib import Path


def load_theme(theme_name: str) -> str:
    current = Path(__file__).resolve()

    # walk up until we find "src"
    for parent in current.parents:
        if (parent / "src").exists():
            project_root = parent
            break
    else:
        raise RuntimeError("Could not locate project root")

    theme_path = project_root / "src/theme" / theme_name / "colors.scss"

    print("Resolved path:", theme_path)

    if not theme_path.exists():
        raise FileNotFoundError(theme_path)

    return theme_path.read_text()
