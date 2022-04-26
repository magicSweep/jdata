import { readFile, writeFile, existsSync, unlinkSync } from "fs";
import { promisify } from "util";
import { join } from "path";
import { init, getAll } from ".";
import wait from "waait";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// WE CAN NOT TEST FIRESTORE CAUSE OF IT IMPORTS LIKE FIREBASE/ADMIN
// BABEL-JEST DO NOT HELP US - DO NOT KNOW WHY
/* describe("Firestore", () => {
  describe.skip("getAll", () => {
    test("", async () => {
      expect(true).toBe(true);
    });
  });
}); */

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
});
