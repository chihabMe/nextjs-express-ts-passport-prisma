import type { Config } from "jest";

const config: Config = {
  verbose: true,
  silent: false,
  forceExit: true,
  testEnvironment: "node",
  roots: ["./server"],
  collectCoverage: false,
  collectCoverageFrom: ["./server/**/*.ts"],
  preset: "ts-jest",
  testPathIgnorePatterns: ["./server/types"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.server.json",
      tsconfig: "tsconfig.server.json",
    },
  },
};
export default config;
