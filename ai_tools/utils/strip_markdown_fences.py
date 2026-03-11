
import re


def strip_markdown_fences(text: str) -> str:
    """Remove ``` fences if the model returns them."""
    text = re.sub(r"```[a-zA-Z]*\n?", "", text)
    return text.replace("```", "").strip()
