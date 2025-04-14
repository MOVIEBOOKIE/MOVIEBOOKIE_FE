module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "chore",
        "style",
        "refactor",
        "test",
        "build", 
        "ci", 
        "perf", 
        "revert", 
        "asset",
        "type",
        "rename", 
        "remove",
        "hotfix",
      ],
    ],
  },
};
