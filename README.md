# CodeVector Backend Assignment

## Overview

This project is a backend application built using Node.js, Express.js, and PostgreSQL (Neon DB). It supports browsing a large dataset of 200,000 products with category filtering and cursor-based pagination.

## Tech Stack

* Node.js
* Express.js
* PostgreSQL (Neon)

## Features

* Generate and store 200,000 products
* Browse products (newest first)
* Filter products by category
* Cursor-based pagination
* Fast product retrieval

## Database Schema

Products table contains:

* id
* name
* category
* price
* created_at
* updated_at

## API Endpoints

### Get Products

GET /products

### Filter by Category

GET /products?category=Electronics

### Pagination

GET /products?limit=5

### Category + Pagination

GET /products?category=Electronics&limit=5

### Cursor Pagination

GET /products?limit=5&cursor=199980

## Setup Instructions

1. Install dependencies
   npm install

2. Create products table
   node src/createTable.js

3. Generate 200,000 products
   node src/seedProducts.js

4. Start server
   node server.js

## Design Decisions

* PostgreSQL was chosen because it handles large datasets efficiently.
* Cursor-based pagination was used instead of offset pagination to improve performance and avoid duplicate records while browsing.
* Neon DB was used as a free hosted PostgreSQL solution.

## Future Improvements

* Add indexes on frequently queried columns.
* Add API documentation.
* Add caching for high-traffic requests.
* Add authentication and authorization.

## AI Usage

AI was used for guidance, debugging, and understanding implementation approaches. All code was reviewed, tested, and modified during development.
