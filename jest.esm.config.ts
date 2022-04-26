import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  //verbose: true,

  testEnvironment: "jest-environment-node", //js-dom
  //testEnvironment: "jest-environment-jsdom",

  moduleNameMapper: {
    /*  "\\.(css)$": "<rootDir>/node_modules/identity-obj-proxy",
    "^.+\\.module\\.(css|sass|scss)$":
      "<rootDir>/node_modules/identity-obj-proxy", */
    "^lodash-es(.*)$": "<rootDir>/node_modules/lodash",
  },

  roots: ["<rootDir>/src"],

  //testMatch: ["<rootDir>/src/**/*.etest.(js|jsx|ts|tsx)$)"],

  testRegex: ["(/__tests__/.*|(\\.|/)(etest))\\.[jt]sx?$"],

  transform: {
    "^.+\\.(js|ts)$": "babel-jest",
    //"^.+\\.[t|j]sx?$": "babel-jest",
    //"^.+\\.(ts|tsx)$": "ts-jest",
    //"[/\\\\]node_modules/node-fetch[/\\\\].+\\.(js|jsx)$": "babel-jest",
    //"^.+\\.(js)$": "babel-jest",
    //"^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest",
    //"^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/jest/fileTransform.js",
  },

  transformIgnorePatterns: [
    //"[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$",
    //"^.+\\.module\\.(css|sass|scss)$",
  ],

  //setupFiles: ["<rootDir>/jest/globalMock.js"],
};
export default config;
