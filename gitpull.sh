sudo git pull
sudo npm run build
sudo chown -R ubuntu:ubuntu *
pm2 reload ecosystem.config.js
