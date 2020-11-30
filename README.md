# Introduction

A [NodeJS](https://nodejs.org) based Web Search Engine API. It can Crawl, Index, Rank & Search Links.

## Prerequisites

1. [Node.js](https://nodejs.org)
2. [Nodemon](https://www.npmjs.com/package/nodemon)

## Project Setup

### Install Dependencies

```shell
npm install
```

### Run in Development Mode

```shell
npm run dev
```

### Run in Production Mode

```shell
npm start
```

## API Endpoints

| Type | Endpoint                        | Description                   | POST Data                   |
| ---- | ------------------------------- | ----------------------------- | --------------------------- |
| POST | /crawl                          | Add links for crawling.       | `{"links": ["google.com"]}` |
| GET  | /crawl?limit=10                 | Start crawling links.         |                             |
| PUT  | /rank                           | Rank all crawled links.       |                             |
| GET  | /search?q=gmail&page=1&limit=10 | Get relevant links for query. |                             |
