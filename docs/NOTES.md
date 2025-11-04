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

Added the following script to /server/package.json:

```
"scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
```

### Install Dependencies

I am using `npm` as my package manager

- Installed the following dependencies to their respective workspace using `npm i [package-name] -w [workspace]`
- Client Workspace: `react-router-dom`, `react-toastify`, `tailwindcss`, `@tailwindcss/vite`, `lodash`
- Server Workspace: `nodemon`, `axios`, `cheerio`, `mongoose`, `express`, `bcrypt`, `jsonwebtoken`, `dotenv`, `validator`, `cors`

## Work on Client Side Development

### Development Flow

- Create UI framework on Figma
- Build the following main pages in the following order:
  - Home (logged in)
  - Home (landing page)
- Implemented client side item sorting and filtering

## Server Side Development

- Created .env file for environment variables
- Set up mongodb config file for database connection
  - Allow all IPs to make edits to database by setting network access to "0.0.0.0/0". Ensures API requests aren't timedout or denied
- Established file structure for API and build on them in the following order
  - /config - config files, includes mongodb connection
  - /models - data models for user, collection, and item
  - /controllers - logic and functions for handling requests
  - /routes - defines the API's routes
  - /middleware - logic and functions that occur before the controller function, used to authenticate users first

## New Concepts

- Transactions in Mongoose: transactions allow for the execution of multiple operations and can undo all operations if one fails. (used in user controller for /deleteUser function)
- HTTP Response Status Codes: 400 Bad Request, 403 Forbidden, 409 Conflict

## TO COME BACK TO:

- Unsure if shared workspace is necessary, may remove later if not used (only useful if there are packages/libraries used by all workspaces)

### Future Plans on Features

- Item tooltip that looks like the tooltip in game or from the DPS Mirror Calculator
