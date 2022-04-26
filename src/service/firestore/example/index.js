"use strict";
exports.__esModule = true;
/**
 * @jest-environment node
 */
var __1 = require("./..");
var path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
// WE CAN NOT USE JEST TO TEST THIS, CAUSE JEST DO NOT UNDERSTAND IMPORTS LIKE "firebase-admin/firestore"
// $ npm run tsc src/firestore/example.ts
// $ node src/firestore/example.js
var photosCollectionName = "photos";
var tagsCollectionName = "tags";
(0, __1.init)();
(0, __1.getAll)("tags")()
    .then(function (data) { return console.log(data); })["catch"](function (err) { return console.error("-----------ERROR", err); });
/* const addOne = addOne_(photosCollectionName);

addOne({
  date: new Date().toUTCString(),
  _timestamp: Timestamp.fromDate(new Date()),
}).then((res) => console.log("[RESULT]", res)); */
/* const getAll = getAll_(photosCollectionName);

getAll().then((res) => console.log("[RESULT]", res)); */
/* const getOne = getOne_(photosCollectionName);

getOne("3v4xjUQHp8S4P52ifQvU").then((res) => console.log("[RESULT]", res)); */
//const addMany = addMany_(tagsCollectionName);
/* addMany(tags)
  .then(() => console.log("SUCCESS ADD", tags))
  .catch((err: any) => console.error(err)); */
