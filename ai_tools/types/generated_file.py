
from dataclasses import dataclass


@dataclass
class GeneratedFile:
    path: str
    content: str
