module.exports = {
  apps: [
    {
      name: 'api',
      script: './dist/index.js',
      env: {NODE_ENV: 'production'},
    },
  ],
};
