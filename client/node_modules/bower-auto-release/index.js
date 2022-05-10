#!/usr/bin/env node
var commandLineArgs = require('command-line-args');
var workingDir = process.cwd();
var packageJson = require(workingDir + '/package.json');
var bowerJson = require(workingDir + '/bower.json');
var bower = require('bower');

var options = commandLineArgs([
  { name: 'dist', defaultValue: 'dist' },
  { name: 'git-repo', defaultValue: process.env.GIT_REMOTE_URL },
  { name: 'branch', defaultValue: packageJson.name + '-bower-component' },
  { name: 'version', defaultValue: packageJson.version }
]);

require('child_process')
  .spawn(__dirname + '/release.sh', [options.version, workingDir, options.dist, options['git-repo'], options.branch], {stdio: 'inherit'})
  .on('close', function () {
    console.log('checking if repo needs registering in bower');
    bower.commands.lookup(bowerJson.name).on('end', function(result) {
      if(!result) {
        console.log('registering the new repo in bower');
        bower.commands.register(bowerJson.name, options['git-repo']);
      } else {
        console.log('already registered in bower');
      }
    });
  });
