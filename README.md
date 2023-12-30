
# Keyword Searching REST API

It's a backend REST API where you will be hitting an external API upon user request and run some keyword searching on the response array texts based on user query

External API:  https://jsonplaceholder.typicode.com/posts



## Table of Contents

- [Introduction](#introduction)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Tech](#tech)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## Introduction

When a user searches your local backend, localhost:3000/search?keyword="mango" you will be hitting the External API on all posts, then matched posts by their body or title will be inserted in a table/collection as a match record and the user's search action as a unique identity in another table/collection and return the search result to the user finally as API response.

## API Documentation

``Keyword Searching REST API`` is currently woring with the following APIs.


| Entity | HTTP Method | Purpose | URL | Query Parameters | API Output (Success) | API Output (Failure)
| ------ | ------ | ----- | ----- | ----- | ----- | ----- |
| Search | GET | Search posts by keyword | /search?keyword={keyword} | { "keyword"?:String } | {"success":Boolean, "message": String, "data":{"posts":[{"userId":String,"id":String,"title":"String","body":"String"}],"postCount":68},} | {"error":Boolean, "message": String,}  |
| Search | POST | Store Matched Post | /search?keyword={keyword} | { "keyword"?:String } | {"success":Boolean, "message": String, "data": { "userId":String,"id":String,"title":String,"body":String} | {"error":Boolean, "message": String, "data": null}
| Search | POST | Store Search History | /search?keyword={keyword} | { "keyword"?:String } | {"success":Boolean, "message": String, "data": { "keyword":String,"ipAddress":String,"searchResult":Array} | {"error":Boolean, "message": String, "data": []}


## Features

- Store posts that match with keyword that is used in searching
- Store user's search history. 
- Display matched post on the browser


## Tech

``Keyword Searching REST API`` uses a number of open source projects to work properly:

- [Node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [MongoDB] - cross-platform, document-oriented database   classified as a NoSQL database 


And of course Keyword Searching REST API itself is open source with a [public repository][RESTAPI_TASK]
 on GitHub.
## Getting Started

Follow these instructions to get the Keyword Searching REST API up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js.
- npm (Node Package Manager).

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```


2. Install Dependencies

```bash
npm install
```

3. Create a mongodb database, create a MongoDB user and copy the connection url in a .env file in the root directory as a value of MONGODB_URL.

## Usage

1. Start the application:

```bash
npm start
```

2. Open your browser and go to http://localhost:3000/search?keyword=something to see if body or title of any post matched with the keyword.

3. Check your MongoDB database whether matched post and search history is stored in two seperate tables. If found, that means the app is running properly.