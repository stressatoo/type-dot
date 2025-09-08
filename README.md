# type(dot)

**type(dot)** is a typing speed test application built using **Astro**, **Svelte**, and **TailwindCSS**. It allows users to test their typing speed and accuracy by typing randomly generated words.

## Features

- **Typing Speed Test**: Measure your typing speed in words per minute (WPM).
- **Accuracy Tracking**: Visual feedback for correct and incorrect characters.
- **Random Word Generation**: Dynamically generates random words for each test.
- **Keyboard Shortcuts**:
  - `Tab`: Restart the typing test.
  - `Backspace`: Delete the last character.
- **Responsive Design**: Fully responsive and styled with TailwindCSS.

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/stressatoo/type-dot.git
   ```

2. Navigate to the project directory:

   ```sh
   cd type-dot
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:4321
   ```

---

## Project Structure

The project follows a modular structure for better maintainability:

```
type-dot/
├── src/
│   ├── components/         # Svelte components
│   │   ├── Typing.svelte   # Main typing test component
│   │   └── Icon.svelte     # Icon rendering component
│   ├── layouts/            # Layout files
│   │   └── Layout.astro    # Base layout for pages
│   ├── pages/              # Astro pages
│   │   └── index.astro     # Home page
│   ├── styles/             # Global styles
│   │   └── global.css      # TailwindCSS imports
│   ├── utils/              # Utility functions and constants
│       ├── const/          # Constants (e.g., colors, words, icons)
│       ├── randomWords.utils.js
│       ├── randomNumber.utils.js
│       └── randomQuote.utils.js
├── .vscode/                # VS Code settings
├── public/                 # Static assets (e.g., favicon)
├── .gitignore              # Git ignore file
├── package.json            # Project metadata and scripts
├── tailwind.config.js      # TailwindCSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## Commands

All commands are run from the root of the project:

| Command               | Action                                 |
| :-------------------- | :------------------------------------- |
| `npm install`         | Installs dependencies                  |
| `npm run dev`         | Starts the local development server    |
| `npm run build`       | Builds the project for production      |
| `npm run preview`     | Previews the production build locally  |
| `npm run astro ...`   | Runs Astro CLI commands                |
| `npm run build:serve` | Builds and serves the production build |
| `npm run lint:fix`    | Fixes linting issues                   |
| `npm run format:fix`  | Formats the codebase using Prettier    |

---

## Technologies Used

- **Astro**: Static site generator for fast and modern web applications.
- **Svelte**: Component-based framework for building interactive UIs.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Vite**: Build tool for fast development.
- **i18next**: Internationalization support (future-proofing for multi-language support).

---

## Keyboard Shortcuts

- **Tab**: Restart the typing test.
- **Backspace**: Delete the last character.

---

## Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Svelte Documentation](https://svelte.dev/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
