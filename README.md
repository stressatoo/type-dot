# type(dot)
## Installazione
```sh
# Clona repository
git clone https://github.com/stressatoo/type-dot.git

# Entra nella directory
cd type-dot

# Installa le dipendenze
npm install

# Mostra un preview locale
npm run dev
```

## Git Version Control
```sh
# Aggiungi file
git add <filesToAdd>
# esempio git add README.md
# esempio git add . (aggiunge tutto ciò che è stato modificato)

# Commit
git commit -m "Message"
# esempio git commit -m "Add MainComponent.svelte, clean-up code"

# Push
git push origin main
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run build:serve`     | Run npm run build && npm run serve               |

## Learn more

 [Docs](https://docs.astro.build) - [Discord server](https://astro.build/chat)
