module.exports = {
  apps: [
    {
      name: "BOOKNEST_REACT",
      script: "serve",
      args: "-s build -l 3000", // -s = serve static, -l = listen on port
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
