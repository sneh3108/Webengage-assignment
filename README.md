# Express CSV Generator

This project is an Express.js server that integrates data from three different APIs, extracts specific key values, writes them into a CSV file, and returns the path to the generated CSV file.

## Features

- Fetches data from three APIs:
  1. [Users API](https://jsonplaceholder.typicode.com/users)
  2. [Posts API](https://jsonplaceholder.typicode.com/posts)
  3. [Comments API](https://jsonplaceholder.typicode.com/comments)
- Extracts specific fields (`name`, `title`, `body`) from the API responses.
- Combines the data into a CSV file with headers: `name`, `title`, `body`.
- Saves the CSV file in an `output` directory.
- Returns the path to the generated CSV file in the API response.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
  
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/express-csv-generator.git
   cd express-csv-generator

2. Install dependencies:
   ```bash
   npm install

3. Start the server:
   ```bash
   node index.js

The server will start running on http://localhost:3000

## Generating the CSV File

To generate the CSV file, make a GET request to the /generate-csv endpoint:

-Using a browser: Visit http://localhost:3000/generate-csv

-Using Curl

 ```bash
   curl http://localhost:3000/generate-csv

## Generating the CSV File
