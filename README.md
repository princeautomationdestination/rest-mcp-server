# 🛠️ MCP REST API Server (CRUD + Auth)

This is a Node.js-based [Model Context Protocol (MCP)](https://modelcontextprotocol.org/) server that provides full **CRUD operations** over a REST API using tools powered by [Axios](https://axios-http.com/). It includes features like authentication, data creation, update (PUT/PATCH), fetch, and delete.

---

## 📦 Features

* 🔐 `generateToken`: Authenticate a user and generate a token
* 📥 `fetchData`: Fetch data with optional query parameters
* ➕ `postrequest`: Create a new resource via `POST`
* ✏️ `put_request`: Full update of a resource using `PUT`
* 🩹 `patch_request`: Partial update using `PATCH`
* ❌ `delete_request`: Delete a resource using `DELETE`
* 🤖 LLM-compatible with Claude and others via MCP interface

---

## 📁 Project Structure

```bash
project/
├── index.js           # Entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed:

* Node.js (v18+)
* npm or yarn

### 2. Installation

```bash
npm install
```

Or manually install:

```bash
npm install axios zod @modelcontextprotocol/sdk
```

### 3. Running the Server

```bash
node index.js
```

You should see:

```
REST API MCP Server for full CRUD operations with authentication running on stdio
```

---

## 🧪 Available Tools

Each tool can be invoked via the MCP protocol interface:

### ✅ `generateToken`

Authenticate a user and generate a token
**Params**: `baseURL`, `endpoint`, `username`, `password`

### 📥 `fetchData`

Fetch data from API using `GET`
**Params**: `baseURL`, `endpoint`, `params` (optional)

### ➕ `postrequest`

Create a new resource using `POST`
**Params**: `baseURL`, `endpoint`, `payload` (JSON string)

### ✏️ `put_request`

Update a resource fully using `PUT`
**Params**: `baseURL`, `endpoint`, `token`, `payload`

### 🩹 `patch_request`

Update partially using `PATCH`
**Params**: `baseURL`, `endpoint`, `token`, `payload`

### ❌ `delete_request`

Delete a resource using `DELETE`
**Params**: `baseURL`, `endpoint`, `token`

---

## 🤖 𝐇𝐨𝐰 𝐭𝐨 𝐜𝐨𝐧𝐧𝐞𝐜𝐭 𝐭𝐡𝐢𝐬 𝐰𝐢𝐭𝐡 𝐋𝐋𝐌 𝐥𝐢𝐤𝐞 𝐂𝐥𝐚𝐮𝐝𝐞

To use this server as a tool with Claude (Anthropic) or other LLMs that support MCP, include the following configuration in your `.mcp.json` or wherever your tooling is configured:

```json
{
 "mcpServers": {
 "httpServer": {
 "command": "npx",
 "args": ["-y", "@princeautomationdestination/rest-mcp-server"]
 }
 }
}
```

---

## 🛡️ Error Handling

Every tool handles its own error and returns:

* Friendly message on failure
* JSON string of response data on success
* Full logs to `stderr` for debugging

---

## 📄 License

MIT License. Open for use, extension, and community contribution.

---

Let me know if you want a badge section, Dockerfile, or `package.json` template to publish your MCP server to npm.
