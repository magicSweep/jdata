import { google, youtube_v3, GoogleApis } from "googleapis";
import { createWriteStream, createReadStream, ReadStream } from "fs";
import { YoutubeVideoInfo } from "./types";
import { Logger } from "winston";
import { OAuth2Client } from "google-auth-library";
const readline = require("readline");

export let auth: OAuth2Client;

export const setAuth = (auth_: OAuth2Client) => {
  auth = auth_;
};

export const getAuth: () => OAuth2Client = () => auth;

//export const getAccessToken = () => client.getAccessToken();

const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube.readonly",
];

export const getNewToken =
  (
    clientSecret: string,
    clientId: string,
    redirectUrl: string,
    scopes: string[]
  ) =>
  () => {
    //return new Promise((resolve, reject) => {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUrl
    );

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });
    console.log("Authorize this app by visiting this url: ", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(
      "Enter the code from that page here: ",
      function (code: string) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
          if (err) {
            console.log("Error while trying to retrieve access token", err);
            return;
          }
          console.log("--TOKEN--", token);
          //resolve(token);
          //oauth2Client.credentials = token;
          //storeToken(token);
          //callback(oauth2Client);
        });
      }
    );
    //});
  };

export const init_ = (
  google: GoogleApis,
  clientSecret: string,
  clientId: string,
  redirectUrl: string,
  scopes: string[],
  token: string,
  setAuth: (auth_: any) => void,
  logger: Logger
) => {
  /*   let private_key = processEnv.DRIVE_PRIVATE_KEY as string;
      const client_email = processEnv.DRIVE_CLIENT_EMAIL as string;
      const projectId = processEnv.PROJECT_ID as string; */

  try {
    /* if (process.env.IENV === "heroku") {
      private_key = private_key.replace(/\\n/g, "\n");
    } */

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUrl
    );

    oauth2Client.credentials = JSON.parse(token);

    setAuth(oauth2Client);

    /* client = await google.auth.getClient({
      credentials: {
        private_key,
        client_email,
      },
      //credentials,
      scopes: [
        //"https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.upload",
        "https://www.googleapis.com/auth/youtube.readonly",
      ],
      projectId,
    }); */

    /*  setYoutube(
      google.youtube({
        version: "v3",
        auth: client,
      })
    ); */
  } catch (err) {
    logger.log("error", "YOUTUBE AUTH ERROR", {
      error: err,
      ienv: process.env.IENV,
    });
  }
};

export const getVideosByIds_ =
  (getAuth: () => OAuth2Client) =>
  (videoIds: string[]): Promise<YoutubeVideoInfo[]> => {
    return new Promise((resolve, reject) => {
      var youtube = google.youtube("v3");
      youtube.videos.list(
        {
          auth: getAuth(),
          //key: "AIzaSyBlvKWyVUMx0Z5IlQwAcWEVL6PfG7v4Lnw",
          part: ["snippet", "contentDetails", "statistics"],
          // ["ahU1GkXvTaM"],
          id: videoIds,
          //forUsername: "Miracle Man",
        },
        function (err, response) {
          if (err) {
            reject(err);
            return;
          }

          if (response === undefined || response === null) {
            reject("Bad response");
            return;
          }

          const items = response.data.items;

          if (items === undefined || items.length === 0) {
            resolve([]);
            return;
          }

          const resVideos = items.map((video: any) => ({
            id: video.id as string,
            title: video.snippet?.title as string,
            viewCount: video.statistics?.viewCount as string,
            thumbnailsUrl: video.snippet?.thumbnails?.default?.url as string,
          }));

          resolve(resVideos);
        }
      );
    });
  };

export const getChannels_ =
  (getAuth: () => OAuth2Client) => (): Promise<youtube_v3.Schema$Channel[]> => {
    return new Promise((resolve, reject) => {
      var youtube = google.youtube("v3");
      youtube.channels.list(
        {
          auth: getAuth(),
          part: ["snippet", "contentDetails", "statistics"],
          //forUsername: "Miracle Man",
          managedByMe: true,
        },
        function (err, response) {
          if (err) {
            reject(err);
            return;
          }

          if (response === undefined || response === null) {
            reject("Bad response");
            return;
          }

          resolve(response.data?.items as youtube_v3.Schema$Channel[]);

          /* if (channels === undefined) throw new Error("Bad channels");

      if (channels.length == 0) {
        console.log("No channel found.");
      } else {
        console.log(
          "This channel's ID is %s. Its title is '%s', and " +
            "it has %s views.",
          channels[0].id,
          (channels[0].snippet as youtube_v3.Schema$ChannelSnippet).title,
          (channels[0].statistics as youtube_v3.Schema$ChannelStatistics)
            .viewCount
        );
      } */
        }
      );
    });
  };

type UploadVideoProps = {
  //token: string;
  videoStream: ReadStream;
  title: string;
  description?: string;
};

export const uploadVideo_ =
  (getAuth: () => OAuth2Client) =>
  ({
    //token,
    videoStream,
    title,
    description,
  }: UploadVideoProps): Promise<YoutubeVideoInfo> => {
    return new Promise((resolve, reject) => {
      var youtube = google.youtube("v3");
      youtube.videos.insert(
        {
          auth: getAuth(),
          // api_key
          //key: "AIzaSyBlvKWyVUMx0Z5IlQwAcWEVL6PfG7v4Lnw",
          //access_token: token,
          part: ["snippet", "contentDetails", "statistics"],
          //forUsername: "Miracle Man",
          notifySubscribers: false,
          requestBody: {
            snippet: {
              title,
              description,
            },
          },
          media: {
            body: videoStream,
          },
        },
        function (err, response) {
          if (err) {
            reject(err);
            return;
          }

          if (response === undefined || response === null) {
            reject("Bad response");
            return;
          }

          resolve({
            id: response.data.id as string,
            title: response.data.snippet?.title as string,
            viewCount: response.data.statistics?.viewCount as string,
            thumbnailsUrl: response.data.snippet?.thumbnails?.default
              ?.url as string,
          });

          /* if (channels === undefined) throw new Error("Bad channels");
  
        if (channels.length == 0) {
          console.log("No channel found.");
        } else {
          console.log(
            "This channel's ID is %s. Its title is '%s', and " +
              "it has %s views.",
            channels[0].id,
            (channels[0].snippet as youtube_v3.Schema$ChannelSnippet).title,
            (channels[0].statistics as youtube_v3.Schema$ChannelStatistics)
              .viewCount
          );
        } */
        }
      );
    });
  };

export const deleteVideoById_ =
  (getAuth: () => OAuth2Client) =>
  (videoId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      var youtube = google.youtube("v3");
      youtube.videos.delete(
        {
          auth: getAuth(),
          id: videoId,
        },
        function (err, response) {
          if (err) {
            reject(err);
            return;
          }

          if (response === undefined || response === null) {
            reject("Bad response");
            return;
          }

          resolve();

          /* if (channels === undefined) throw new Error("Bad channels");
  
        if (channels.length == 0) {
          console.log("No channel found.");
        } else {
          console.log(
            "This channel's ID is %s. Its title is '%s', and " +
              "it has %s views.",
            channels[0].id,
            (channels[0].snippet as youtube_v3.Schema$ChannelSnippet).title,
            (channels[0].statistics as youtube_v3.Schema$ChannelStatistics)
              .viewCount
          );
        } */
        }
      );
    });
  };

export const init = (logger: Logger) =>
  init_(
    google,
    process.env.YOUTUBE_CLIENT_SECRET as string,
    process.env.YOUTUBE_CLIENT_ID as string,
    process.env.YOUTUBE_REDIRECT_URL as string,
    SCOPES,
    process.env.YOUTUBE_TOKEN as string,
    setAuth,
    logger
  );

export const getVideosByIds = getVideosByIds_(getAuth);

export const uploadVideo = uploadVideo_(getAuth);

export const deleteVideoById = deleteVideoById_(getAuth);
