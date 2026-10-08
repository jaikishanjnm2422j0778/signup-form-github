# Signup Form

A clean, accessible signup form with client-side validation, built with plain **HTML, CSS and vanilla JavaScript**. There is no backend, no framework and no build step.

## Features

- Fields: full name, email, 10-digit phone, password, confirm password, message and a terms checkbox
- Validation on submit, with live re-validation once a field has an error
- Password show/hide toggle and a password-strength meter (Weak / Medium / Strong)
- Success banner after a valid submission
- Accessible: labels, `aria-describedby`, live error regions, visible focus states and reduced-motion support
- Responsive layout for mobile, tablet and desktop

## Validation rules

| Field | Rule |
|---|---|
| Full name | Required, at least 3 characters |
| Email | Required, valid email format |
| Phone | Required, exactly 10 digits |
| Password | Required, at least 8 characters |
| Confirm password | Must match the password |
| Message | Required, at least 10 characters |
| Terms | Must be checked |

## Getting started

```bash
git clone https://github.com/<your-username>/signup-form.git
cd signup-form
```

Open `index.html` in your browser, or use the **Live Server** extension in VS Code.

## Project structure

```text
signup-form/
├── index.html   # Page structure and form markup
├── style.css    # Design tokens, layout, components, responsive rules
├── script.js    # Validation, password toggle, strength meter
├── bg.jpeg      # (add your own) page background image
├── README.md
├── LICENSE
└── .gitignore
```

## Background image

`style.css` expects a background image named `bg.jpeg` in the same folder as `index.html`. If it is missing, the page falls back to the cream background colour. Add your own image to use it.

## Notes

- The form does not send data anywhere. Add a `fetch()` call in the submit handler in `script.js` to connect it to a backend.
- Fonts (Fraunces and Inter) load from Google Fonts, so they need an internet connection.

## Publishing on GitHub Pages

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under *Build and deployment*, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.

## License

MIT. See [LICENSE](LICENSE).
