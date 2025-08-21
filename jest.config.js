const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],

  // tsconfig.json의 paths를 Jest에 그대로 1:1 반영 (순서 중요: 정확 매칭을 위에)
  moduleNameMapper: {
    "^@/styles/(.*)$": "<rootDir>/src/app/_styles/$1",

    "^@/components$": "<rootDir>/src/app/_components/index",
    "^@/components/(.*)$": "<rootDir>/src/app/_components/$1",

    "^@/constants$": "<rootDir>/src/app/_constants/index",
    "^@/constants/(.*)$": "<rootDir>/src/app/_constants/$1",

    "^@/utils/(.*)$": "<rootDir>/src/app/_utils/$1",
    "^@/mocks/(.*)$": "<rootDir>/src/app/_mocks/$1",

    "^@/icons/(.*)$": "<rootDir>/src/icons/$1",
    "^@/lotties/(.*)$": "<rootDir>/src/lotties/$1",

    "^app/(.*)$": "<rootDir>/src/app/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

module.exports = createJestConfig(customJestConfig);
