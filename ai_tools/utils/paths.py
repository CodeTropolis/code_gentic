
from pathlib import Path

from ai_tools.utils.project_root import find_project_root


SCRIPT_PATH = Path(__file__).resolve()
PROJECT_ROOT = find_project_root(SCRIPT_PATH)
