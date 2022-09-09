const { google } = require("googleapis");
const readline = require("readline");

const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube.readonly",
];

const token = {
  access_token:
    "ya29.a0AVA9y1sWTHX2PujZAaTFEizwTv-e5rz-MxoKFBCshvspu2PdvY2vwAbxE8FDrQpXuTtx-pnoWds5VBzOejIexd2qI0nH10vlhXKd6ZBwgUZEK-U5vpDi7r9adqH3WWdx4Ji4GXcnTdDuj2EoxTc3NBD1rLlBaCgYKATASAQASFQE65dr88i1rNvtleIoB7zWXVGFAEw0163",
  refresh_token:
    "1//0cJaQOFTrxIpfCgYIARAAGAwSNwF-L9Ir0tDRT93nYuwMLLPF4PfOSIrjBCEPD3H2Qg8MbFutU6KscYBb1cvDs-F8liFLNmA-7dw",
  scope:
    "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload",
  token_type: "Bearer",
  expiry_date: 1661778023370,
};

// WHEN IT REDIRECT US TO ://localhost WE CAN GET CODE IN NETWORK TAB, IN QUERY PARAMS
const getNewToken_ = (clientSecret, clientId, redirectUrl, scopes) => () => {
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
  rl.question("Enter the code from that page here: ", function (code) {
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
  });
  //});
};

getNewToken_(
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_REDIRECT_URL,
  SCOPES
)();
