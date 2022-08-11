import { init, getAll, getOneByArrayContainsCondition } from ".";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

describe("Firestore", () => {
  beforeAll(() => {
    init();
  });

  describe.skip("getAll", () => {
    test("", async () => {
      const docs = await getAll("tags")();

      expect(docs).toBe("hello");
    });
  });

  describe("getOneByArrayContainsCondition", () => {
    test("", async () => {
      const doc = await getOneByArrayContainsCondition("photos")(
        "files",
        "j57vpvhxf"
      );

      expect(doc).toBe(undefined);
    });
  });

  /*  
    addOne({
      date: new Date().toUTCString(),
      _timestamp: Timestamp.fromDate(new Date()),
  }).then((res) => console.log("[RESULT]", res)); 

  getOne("3v4xjUQHp8S4P52ifQvU").then((res) => console.log("[RESULT]", res)); */
});
