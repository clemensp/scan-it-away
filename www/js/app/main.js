define(['jquery', 'marionette'], function($, Marionette) {
  var App = new Marionette.Application();

  App.addInitializer(function(opts) {
    var HomeView = Marionette.Layout.extend({
      template: "#home-template",

      initialize: function() {
        _.bindAll(this, 'success', 'failure')
      },

      ui: {
        valueToSend: "input[name='value-to-send']",
        result: "span#result"
      },

      events: {
        "submit form" : "sendRequest"
      },

      sendRequest: function(e) {
        e.preventDefault()

        this.trigger("sendRequest")
      },

      success: function() {
        this.ui.result.text("Success!")
      },

      failure: function() {
        this.ui.result.text("Failed!")
      }
    })

    var homeView = new HomeView({el: opts.contentEl})

    homeView.render()

    var HomeController = Marionette.Controller.extend({
      initialize: function(opts) {
        this.view = opts.view

        this.view.on("sendRequest", this.sendRequest, this)
      },

      sendRequest: function() {
        $.ajax({
          type: "POST",
          url: 'http://pushbox.nu:4567/scan_data',
          data: {
            value: this.view.ui.valueToSend.val()
          }
        })
        .done(this.view.success)
        .fail(this.view.failure)
      }
    })

    new HomeController({
      view: homeView
    })
  })

  return App
})
