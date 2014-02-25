/**
 * Basic Web Server
 * for Heroku
 */

var express = require("express"),
    http = require("http"),
    path = require("path"),
    secret = require("./secret.json");

var app = express();

app.configure(function () {
  app.disable("x-powered-by");
  app.set("port", process.env.PORT || 3000);

  // logger
  app.use(express.logger("dev"));
  app.use(express.errorHandler());

  // basic auth
  app.use(express.basicAuth(secret.user, secret.pass));

  // static routings
  app.use(express.static(path.resolve(__dirname, "dist")));

  // routings
  app.use(app.router);
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server started on", app.get("port"), "port");
});
