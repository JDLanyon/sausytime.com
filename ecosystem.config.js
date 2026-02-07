module.exports = {
  apps : [{
    script: 'npm start',
  }],

  deploy : {
    production : {
      key  : 'key.pub',
      user : 'jdl',
      host : '192.168.0.69',
      ref  : 'origin/master',
      repo : 'git@git.fennec.town/JDLanyon/jdlanyon-dev.git',
      path : '/var/www',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
