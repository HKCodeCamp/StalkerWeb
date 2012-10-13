window.LoginView = (function(Backbone, _, $) {

  var Login = Backbone.Model.extend({

    urlRoot: 'http://istalkerapp.appspot.com/login/'

  });

  var View = Backbone.View.extend({

    events: {
      'submit form': 'onLoginSubmit'
    },

    initialize: function() {
      this.model = new Login();
    },

    onLoginSubmit: function(e) {
      e.preventDefault();
      this.$('.alert').hide();
      // if (!this.model.has('username') || !this.model.has('password')) {
      //   this.$('.alert').show();
      //   return;
      // }
      this.model.save({
        username: this.$('input#username').val(),
        password: this.$('input#password').val()
      }, {
        success: _.bind(this.onLoginSuccess, this),
        error: _.bind(this.onLoginError, this)
      });
    },

    onLoginSuccess: function(model, response) {
      sessionStorage.setItem('user_id', model.get('user_id'));
      sessionStorage.setItem('username', model.get('username'));
      window.location = '/';
    },

    onLoginError: function() {
      this.$('.alert').show();
    }

  });

  return View;
})(window.Backbone, window._, window.jQuery)

window.RegisterView = (function(Backbone, _, $) {

  var Registration = Backbone.Model.extend({

    urlRoot: 'http://istalkerapp.appspot.com/register/'

  });

  var View = Backbone.View.extend({

    events: {
      'submit form': 'onRegistrationSubmit'
    },

    initialize: function() {
      this.model = new Registration();
    },

    onRegistrationSubmit: function(e) {
      e.preventDefault();
      this.$('.alert').hide();
      this.model.save({
        username: this.$('input#username').val(),
        password: this.$('input#password').val()
      }, {
        success: _.bind(this.onRegistrationSuccess, this),
        error: _.bind(this.onRegistrationError, this)
      });
    },

    onRegistrationSuccess: function(model, response) {
      sessionStorage.setItem('user_id', model.get('user_id'));
      sessionStorage.setItem('username', model.get('username'));
      window.location = '/';
    },

    onRegistrationError: function() {
      this.$('.alert').show();
    }

  });

  return View;
})(window.Backbone, window._, window.jQuery)

window.ListView = (function(Backbone, _, $) {

  var StalkLine = Backbone.Collection.extend({

    urlRoot: 'http://istalkerapp.appspot.com/list/'

  });

  var View = Backbone.View.extend({

    initialize: function() {
      this.collection = new StalkLine();
    },

    render: function() {
      
      return this;
    }

  });

  return View;
})(window.Backbone, window._, window.jQuery)