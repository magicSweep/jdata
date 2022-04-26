/**
 * @jest-environment node
 */
import {
  addOne as addOne_,
  addMany as addMany_,
  init,
  getOne,
  getAll,
} from "./..";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { Timestamp } from "firebase-admin/firestore";

import { readFile, writeFile, existsSync, unlinkSync } from "fs";
import { promisify } from "util";
import { join } from "path";
import wait from "waait";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// WE CAN NOT USE JEST TO TEST THIS, CAUSE JEST DO NOT UNDERSTAND IMPORTS LIKE "firebase-admin/firestore"
// $ npm run tsc src/firestore/example.ts
// $ node src/firestore/example.js

const photosCollectionName = "photos";
const tagsCollectionName = "tags";

init();

getAll("tags")()
  .then((data: any[]) => console.log(data))
  .catch((err: any) => console.error("-----------ERROR", err));

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
