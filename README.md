# Introduction

A Web Search Engine API built with [NodeJS](https://nodejs.org). It uses Google's [PageRank](https://en.wikipedia.org/wiki/PageRank) algorithm for ranking links. You can can Crawl, Index, Rank & Search links using this API.

## Prerequisites

1. [NodeJS](https://nodejs.org)
2. [Nodemon](https://www.npmjs.com/package/nodemon)
3. [PostgreSQL](https://www.postgresql.org)

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

| Type | Endpoint                        | Description                   | POST Data JSON              |
| ---- | ------------------------------- | ----------------------------- | --------------------------- |
| POST | /crawl                          | Add links for crawling.       | `{"links": ["google.com"]}` |
| GET  | /crawl?limit=10                 | Start crawling links.         |                             |
| PUT  | /rank                           | Rank all crawled links.       |                             |
| GET  | /search?q=gmail&page=1&limit=10 | Get relevant links for query. |                             |
