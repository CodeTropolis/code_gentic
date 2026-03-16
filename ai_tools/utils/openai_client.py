from openai import OpenAI
import os

MODEL = os.getenv("OPENAI_MODEL", "gpt-5.2")
client = OpenAI()

# def generate(prompt):
# client = OpenAI()

# resp = client.responses.create(
# model=MODEL,
# input=[{"role": "user", "content": prompt}],
# temperature=0.2,
# max_output_tokens=12000,
# )

# return resp.output_text

# ----------------------------------------------------

# This version biases the model behavior towards
# producing code by including a system message that
# defines the assistant's role and expertise.


def generate(prompt: str) -> str:
    resp = client.responses.create(
        model=MODEL,
        temperature=0.2,
        max_output_tokens=4000,
        input=[
            {
                "role": "system",
                "content": "You are a senior Angular + Ionic developer that produces production-quality code."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
    )

    return resp.output_text
