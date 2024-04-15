const config = {
  preset: "@vue/cli-plugin-unit-jest",
  testMatch: [
    "<rootDir>/tests/integration/**/*.spec.js",
    "<rootDir>/tests/unit/**/*.spec.js",
  ],
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "test-results", outputName: "report.xml" },
    ],
  ],
  transformIgnorePatterns: [
    "/node_modules/(?!axios|quillEditor|quill-image-uploader).+\\.js$",
  ],
  testTimeout: 60000,
};
module.exports = config;
