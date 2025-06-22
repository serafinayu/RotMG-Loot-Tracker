## Setting up my Environment

I am using VSCode as my code editor and will be using the following VSCode extensions during development:

- `ES7 React/Redux/GraphQL/React-Native snippets`
- `Tailwind CSS Intellisense`
- `Prettier`

### Setup Basic File Structure

- Initialize boilerplate file structure for the `/client` directory with `npm create vite@latest`
- Create another folder named `/server` in the root directory

### Set up Workspaces

- Create a `package.json` file in the root directory using `npm init` and add the following lines:

```
  "private": true,
  "workspaces": [
    "client",
    "server",
    "shared"
  ],
  "scripts": {
    "dev": "concurrently --names \"CLIENT,SERVER\" --prefix-colors \"magenta,cyan\" \"npm run dev -w client\" \"npm run dev -w server\"",
    "build": "npm run build -w client && npm run build -w server"
  },

```

- `concurrently` is a utility that runs multiple commands in parallel (like two terminals in one).
- `--names \"CLIENT,SERVER\"` adds tags to log lines like [CLIENT] and [SERVER]
- `--prefix-colors \"magenta,cyan\"` adds color, magenta for client, and cyan for server
- `npm run dev -w client` tells npm to run the `dev` script defined in the `client/package.json`.
- `npm run server -w server` tells npm to run the `server` script defined in `server/package.json`.

#### Updated /server package.json

Added the following script the following:

```
"scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
```

### Install Dependencies

I am using `npm` as my package manager

- Installed the following dependencies to their respective workspace using `npm i [package-name] -w [workspace]`
- Client Workspace: `react-router-dom`, `react-toastify`, `tailwindcss`, `@tailwindcss/vite`
- Server Workspace: `nodemon`, `axios`, `cheerio`

## TO COME BACK TO:

- Unsure if shared workspace is necessary, may remove later if not used (only useful if there are packages/libraries used by all workspaces)
