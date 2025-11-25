const config = {
  appName: "Kyle Portfolio",
  appDescription:
    "Portfolio.",
  domainName:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://kyleydrhaine.com",
};

export default config;