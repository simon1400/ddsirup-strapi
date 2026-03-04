module.exports = {
  apps: [
    {
      name: "ddsirup-strapi",
      script: "npm",
      args: "start",
      cwd: "/opt/ddsirup/strapi",
      env: {
        NODE_ENV: "production",
        PORT: 1340,
      },
      max_memory_restart: "1G",
      log_date_format: "YYYY-MM-DDTHH:mm:ss",
      out_file: "/var/log/pm2/ddsirup-strapi-out.log",
      error_file: "/var/log/pm2/ddsirup-strapi-error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
