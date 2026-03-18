
def list_prompt(list_type: str) -> str:
    return f"""
You are generating code for an EXISTING Ionic Angular application using modern Angular + Ionic patterns.

GOAL:
Create a minimal proof-of-concept List page implemented as an Ionic page using:

- Angular standalone component (standalone: true)
- Ionic standalone components
- Angular control flow syntax (@for / @if)
- ion-list and ion-item
- SCSS nested selectors
- Mock data defined inside the component

LIST TYPE:
The list represents: "{list_type}"

GENERAL UI REQUIREMENTS:

- ion-header
- ion-toolbar
- ion-title
- ion-content
- ion-list
- ion-item
- ion-label

Each list row MUST include a **right-facing chevron icon on the right side**.

Use:

ion-icon name="chevron-forward-outline"

ICON POSITION:

- Chevron must appear on the right
- Use slot="end"

--------------------------------

LIST TYPE RULES

USERS LIST

If the list type is **users**:

Each row must contain:

- user profile photo
- name
- email

Profile image requirements:

- image inside a **rounded square container**
- container size: **50px by 50px**
- image fills container
- border-radius: 8px
- image centered

Use a CDN for profile photos such as:

https://randomuser.me/api/portraits/men/1.jpg  
https://randomuser.me/api/portraits/women/2.jpg

Generate several mock users.

Example structure:

name  
email

--------------------------------

CONTACTS LIST

If the list type is **contacts**:

Generate mock contacts containing:

- contact name
- phone number

Example phone numbers:

(555) 123-4567  
(555) 987-6543  
(555) 222-8899

Each row displays:

contact name  
phone number

--------------------------------

PRODUCT LIST

If the list type is **products**:

Generate 6 mock ecommerce products.

Each product must contain the following fields:

- id
- name
- description
- price
- imageUrl

Choose one product category from the following list for each product:

- shoes
- headphones
- backpack
- laptop
- smartwatch
- sunglasses

The product name MUST match the category.

For example:
- shoes → running shoes, trail sneakers
- headphones → wireless headphones, studio headphones
- backpack → travel backpack, laptop backpack
- laptop → ultrabook laptop, developer laptop
- smartwatch → fitness smartwatch, sport smartwatch
- sunglasses → polarized sunglasses, aviator sunglasses

--------------------------------

Use the following product images for each category.

Do NOT generate new URLs.
Use the exact URL that corresponds to the category.

shoes:
https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&h=50&fit=crop

headphones:
https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop

backpack:
https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=50&h=50&fit=crop

laptop:
https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=50&h=50&fit=crop

smartwatch:
https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50&h=50&fit=crop

sunglasses:
https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=50&h=50&fit=crop

--------------------------------

Rules:

- The imageUrl MUST match the category.
- Do NOT generate new image URLs.
- Only use the provided URLs.
- Generate realistic ecommerce product names and descriptions.
- Prices should look realistic (example: 59.99, 129.00).

--------------------------------

Return ONLY valid JSON.

The JSON must be a single array of product objects.

Example format:

[
  {{
    "id": 1,
    "name": "Lightweight Running Shoes",
    "description": "Breathable running shoes designed for everyday comfort.",
    "price": 89.99,
    "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&h=50&fit=crop"
  }}
]

Do not include explanations.
Do not include markdown.
Only return JSON.
--------------------------------

BLANK LIST

If the list type is **blank list** or **blank rows**:

Generate several rows containing:

- no text
- only spacing
- the chevron icon on the right

Rows should visually resemble navigation rows.

--------------------------------

STYLING for ALL LIST TYPES

Use SCSS nested selectors.

Ensure:
- Proper spacing between rows
- Clean Ionic layout
- Modern minimal styling
- 12px padding inside each row
- Do NOT hardcode hex values
- Each row must have an all around border that is slightly darker than the background color

--------------------------------

ANGULAR REQUIREMENTS

Use:

- Angular standalone component
- Ionic standalone components
- Angular control flow syntax

Example:

@for (user of users; track user)

Mock data must be declared inside the component.

--------------------------------

OUTPUT FORMAT (STRICT)

Return ONLY valid JSON using this structure:

{{
  "files": [
    {{ "path": "src/app/pages/{list_type}/{list_type}.page.ts", "content": "..." }},
    {{ "path": "src/app/pages/{list_type}/{list_type}.page.html", "content": "..." }},
    {{ "path": "src/app/pages/{list_type}/{list_type}.page.scss", "content": "..." }},
    {{ "path": "src/app/pages/{list_type}/{list_type}.page.spec.ts", "content": "..." }}
  ],
  "notes": "optional notes"
}}

--------------------------------

CRITICAL RULES

- Return ONLY JSON
- No markdown fences
- No explanations
- No text outside JSON
- Escape quotes inside strings
- JSON must be parseable by Python json.loads()

--------------------------------

TEST FILE REQUIREMENTS

The spec file must:

- compile in Angular
- test component creation
- test list rendering
- test row count
- achieve ~80% code coverage
""".strip()
