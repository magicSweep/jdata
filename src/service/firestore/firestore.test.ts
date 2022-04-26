import { readFile, writeFile, existsSync, unlinkSync } from "fs";
import { promisify } from "util";
import { join } from "path";
import { init, getAll } from ".";
import wait from "waait";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

describe("Firestore", () => {
  beforeAll(() => {
    init();
  });

  describe("getAll", () => {
    test.skip("", async () => {
      const files = await getAll("tags")();

      expect(files).toBe("hello");
    });
  });

  /*  
    addOne({
      date: new Date().toUTCString(),
      _timestamp: Timestamp.fromDate(new Date()),
  }).then((res) => console.log("[RESULT]", res)); 

  getOne("3v4xjUQHp8S4P52ifQvU").then((res) => console.log("[RESULT]", res)); */
});
