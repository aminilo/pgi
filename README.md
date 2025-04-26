# 📦 pgi

A simple & interactive CLI tool to **initialize a NodeJS project** and install your favorite packages in seconds.  
Built with **TypeScript**, **Yargs**, and **Inquirer**, it's designed to be fast, simple, and developer-friendly.

---

## 🚀 Features

- 🔍 Fuzzy-searchable package selection UI (powered by `inquirer-search-checkbox`)
- ⚙️ Auto-installation of selected packages (supports `dependencies` and `devDependencies`)
- 📌 TypeScript types included automatically (e.g., `@types/express`)
- 📋 One-liner install command can be copied to clipboard
- 🦢 Optional Git setup and `.gitignore` generation
- 🧪 Including CLI tests
- 💖 Fully written in TypeScript

---

## 🛠 Tech Stack

- **Language**: TypeScript
- **CLI Engine**: Yargs
- **Interactive Prompts**: Inquirer + inquirer-search-checkbox
- **Clipboard Integration**: clipboardy
- **Terminal Styling**: chalk
- **Typing Effect**: custom `typer` utility (simulated typing in terminal)

---

## 🤩 Available Packages

The following categories of packages are available to choose from:

### ⚙️ Dev Tools

- TypeScript (& ts-node, @types/node)
- Nodemon, ESLint, Prettier
- Husky, lint-staged, cross-env
- concurrently, tsconfig-paths

### 🧪 Testing

- Jest, Vitest, Supertest, Superagent

### 🔥 Server

- Express, express-validator, express-rate-limit
- CORS, Compression, Helmet, HPP, Morgan, cookie-parser

### 🔐 Authentication

- Bcrypt, JSON Web Token (JWT), Passport, Passport JWT

### 📦 Common Libraries

- Yargs, dotenv, uuid, validator, zod, class-validator, dayjs

### 📬 Communication

- Nodemailer

### ⚡ Real-time

- Socket.IO, socket.io-client

### 🗃️ Database / ORM

- MySql, PostgreSQL, Redis
- Prisma, Mongoose, TypeORM

### 🔗 Networking

- Axios, formidable

### 🧰 Utilities

- fs-extra, Multer, rimraf

### 📚 Documentation

- Swagger (swagger-jsdoc + swagger-ui-express)

---

## 📦 How it Works

1. **Run the CLI:**

```bash
npx pgi i
```

2. **Search & select packages to install**

3. **Choose options:**
   - `--copy` or `-c`: Copy the command to clipboard
   - `--git` or `-g`: Setup git & generate `.gitignore`

4. **Let pgi handle the rest!**

---

## 🔢 Example Output

```bash
? Select packages (type to search): (Press <space> to select, <enter> to submit.)
 ◯ TypeScript
 ◯ Express
 ◯ dotenv
 ◯ Prisma
(Move up and down to reveal more choices)
```

```bash
 📦 Installing 4 packages:
 1. TypeScript
 2. Express
 3. dotenv
 4. Prisma
```

```bash
npm init -y && npx tsc --init && npm i -D prisma ts-node typescript @types/{dotenv,express,node} && npm i @prisma/client dotenv express
```

> Tip: Use `--copy` to copy this entire command to clipboard & run it with a single paste.

---

## 🧪 Run CLI Tests

To test the PackageFactory & CLI handler command logic:

```bash
npm test
```

---

## 📁 Project Structure

```
src/
├── commands/
│   └── install.ts
│   └── installCommandHandler.ts
├── tests/
│   └── install.test.ts
│   └── PackageFactory.test.ts
├── types/
│   └── index.d.ts
│   └── inquirer-search-checkbox.d.ts
├── utils/
│   ├── PackageFactory.ts
│   └── typer.ts
```

---

## 🚀 Usage Tips

- Run with `--copy` to copy install command.
- Run with `--git` to set up git + .gitignore in the same command.
- Combine both for an instant project bootstrap command.

---

Made with 💖 by a fellow developer.

> Still in early development. Feel free to suggest improvements!

---
