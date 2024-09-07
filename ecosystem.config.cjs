// change export default >> module.exports = 
export default {
  apps: [
    {
      name: 'WMASN',
      script: 'server.js', // Entry point to your Node.js app
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      env_file: '../configWMASN/app.env', // Specify the environment file
    },
  ],
};