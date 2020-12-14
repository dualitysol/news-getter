# News Getter

All local files stores at the path: `news-express/repository/storage` . Data stores in JSON format

### Installation

News-express requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd news-express
$ npm i
$ npm start
```


### Testing

For yet here are only unit tests

You can easily run it by:

Command:
```sh
$ npm run unit-test
```

If your API_KEY for News API is expired, you can use local server with mocked data.

Simply run next command:

```
$npm run mock-server
```

and change value of `NEWS_API_KEY` in `.env`to ``http://localhost:7777/uploads/response.json``


### Package dependencies

 - `dotenv` to configure easy
 - `express` as simple http server
 - `axios` to request News API easy
 - `mocha` and `chai` for tests

