import express, { Request, Response, NextFunction, json } from "express";
import { createReadStream } from "fs";
import { join, resolve } from "path";
import {
  init as googleInit,
  getVideosByIds,
  uploadVideo,
} from "./../service/youtube";
import dotenv from "dotenv";

//const token =
// "ya29.c.b0AXv0zTPhEy7yTShZ7tSDQgEk7Iiq72ehyClZTBog8p8pYPEXswF76fDz7jsv2318t7Cx8LMv2GSRnF1rfuecw3Q_YWggsD7yIN4ISOpQPvMqaLkWXvh-0a4NBdAGhMdekuqdd8u_PykqXYd0KX5zykEQnckZQ1mpCp8qh4DMkDdlyMeAUMTQfb6MWQoPJqNvQnIQHUXo8kz3bD5nKvN32Kr_bfInj7-Ibw.....................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................";

export const init = async () => {
  dotenv.config({ path: resolve(process.cwd(), ".env") });

  const app = express();

  googleInit(console as any);

  //const token = await getAccessToken();

  //console.log("ACCESS TOKEN", token);

  app.use(json());

  // https://i.ytimg.com/vi/ahU1GkXvTaM/default.jpg
  app.get("/videos", async (req, res, next) => {
    try {
      const videos = await getVideosByIds(["ahU1GkXvTaM"]);

      if (videos === undefined) {
        res.status(200).json({ result: "Bad channels" });

        return;
      }

      if (videos.length == 0) {
        res.status(200).json({ result: "No channel found." });

        return;
      }

      res.status(200).json({
        result: "OK",
        videos,
      });
    } catch (error) {
      res.status(500).end();
      console.log("error", "[ERROR_HANDLER]", {
        METHOD: req.method,
        PATH: req.path,
        REQUEST_BODY: req.body,
        REQUEST_QUERY: req.query,
        ERROR: error,
      });
    }
  });

  app.get("/video-upload", async (req, res, next) => {
    try {
      const pathToVideoToUpload = join(
        process.cwd(),
        "src",
        "static",
        "VID_20191126_114144282.mp4"
      );

      const videoStream = createReadStream(pathToVideoToUpload);

      const result = await uploadVideo({
        //token,
        title: "Super-puper",
        videoStream,
      });

      res.status(200).json({
        result: "OK",
        video: result,
      });
    } catch (error) {
      res.status(500).end();
      console.log("error", "[ERROR_HANDLER]", {
        METHOD: req.method,
        PATH: req.path,
        REQUEST_BODY: req.body,
        REQUEST_QUERY: req.query,
        ERROR: error,
      });
    }
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("error", "[GLOBAL_ERROR_HANDLER]", {
      METHOD: req.method,
      PATH: req.path,
      REQUEST_BODY: req.body,
      REQUEST_QUERY: req.query,
      ERROR: err,
    });

    /* const json: WorkerResponse = {
        status: "error",
      }; */

    // 401 - unauthorized
    // 400 - bad request
    // 201 - created
    // 500 - server error
    res.status(500).end();
  });

  return app;
};
