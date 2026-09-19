module.exports = {
  plugins: ["@prettier/plugin-xml"],
  overrides: [
    {
      files: "*.xml",
      options: {
        parser: "xml",
        xmlWhitespaceSensitivity: "ignore",
      },
    },
  ],
};