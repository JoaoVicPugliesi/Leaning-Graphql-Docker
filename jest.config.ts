import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  preset: 'ts-jest',
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    "^@api/(.*)$": "<rootDir>/api/$1",
    "^@application/(.*)$": "<rootDir>/src/application/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@infra/(.*)$": "<rootDir>/src/infra/$1",
  },
  extensionsToTreatAsEsm: ['.ts'], 
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }], 
  },
};

export default config;
