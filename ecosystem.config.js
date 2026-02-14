module.exports = {
  apps : [{
    script: 'npm start',
  }],

  deploy : {
    production : {
      key  : 'key.pub',
      user : 'jdl',
      host : '192.168.0.69',
      // host : '167.179.163.255',
      ref  : 'origin/main',
      repo : 'git@git.fennec.town:JDLanyon/jdlanyon-dev.git',
      path : '/var/www/sausytime.com',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': ['ForwardAgent=yes', 'IdentitiesOnly=yes', 'IdentityFile=~/.ssh/id_ed25519']
    }
  }
};
