from openai import OpenAI
import os

MODEL = os.getenv("OPENAI_MODEL", "gpt-5.2")


def generate(prompt):
    client = OpenAI()

    resp = client.responses.create(
        model=MODEL,
        input=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_output_tokens=2500,
    )

    return resp.output_text
