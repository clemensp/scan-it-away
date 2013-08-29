require.config({
  baseUrl: 'js/lib',

  paths: {
    app: '../app',
    tpl: '../tpl',
    jquery: 'jquery-1.10.2.min',
    underscore: 'underscore.min',
    backbone: 'backbone.min',
    marionette: 'backbone.marionette.min'
  },

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'marionette': {
      deps : ['jquery', 'underscore', 'backbone'],
      exports : 'Marionette'
    }
  }
});

require(['jquery', 'marionette', "app/main"], function ($, Marionette, App) {

  App.start({contentEl: $("#content")})
});
