'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super ' + chalk.red('Hello') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'greet',
      message: 'What would the greeting be?',
      default: 'Hello Sweetie!'
    }];

    this.prompt(prompts, function (props) {
      this.greet = props.greet;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.mkdir('app');


    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.template("index.html", "app/index.html", {greet: this.greet});
    }
  },

  install: function () {
    this.installDependencies();
  }
});
