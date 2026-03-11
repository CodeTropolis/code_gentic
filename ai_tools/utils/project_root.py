from pathlib import Path


# def find_project_root(start: Path):
# current = start

# while True:
# if (current / "angular.json").exists():
# return current
# if current.parent == current:
# raise RuntimeError("angular.json not found")

# current = current.parent

def find_project_root(start: Path):
    for current in [start, *start.parents]:
        if (current / "angular.json").exists():
            return current

    raise RuntimeError("angular.json not found")
