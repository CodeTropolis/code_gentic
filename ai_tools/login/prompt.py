
def login_prompt() -> str:
    return """
You are generating code for an EXISTING Ionic Angular app using the latest Angular + Ionic patterns.

GOAL:
Create a minimal proof-of-concept Login page implemented as an Ionic page using:

- Angular standalone component (standalone: true)
- Ionic standalone components
- Reactive Forms (FormBuilder/FormGroup)
- Input fields should have rounded corners, a light border, and some space between them
- Input field background should be a light blue, semitransparent color
- Input field height should be around 40px with some left and right padding
- Angular control flow syntax (@if)
- Email + password fields
- Validators: required + email
- Disable submit button when invalid
- Simple submit handler that logs the form value
- Take advantage of SCSS nested selectors for styling

UI:
- ion-header / ion-toolbar / ion-title
- ion-content
- ion-label + ion-input for email
- ion-label + ion-input for password
- ion-button
- ion-text

OUTPUT FORMAT (STRICT):

Return ONLY JSON with this structure:

{
  "files": [
    { "path": "src/app/pages/login/login.page.ts", "content": "..." },
    { "path": "src/app/pages/login/login.page.html", "content": "..." },
    { "path": "src/app/pages/login/login.page.scss", "content": "..." },
    { "path": "src/app/pages/login/login.page.spec.ts", "content": "..." }
  ],
  "notes": "optional"
}

RULES:
- No markdown fences
- No text outside JSON
- Must compile in an Angular Ionic project
- Eighty percent code coverage in the spec file
""".strip()
