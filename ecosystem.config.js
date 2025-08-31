module.exports = {
  apps: [
    {
      name: "BOOKNEST_REACT",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
