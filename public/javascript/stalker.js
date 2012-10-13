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
      if (_.isEmpty(this.$('input#username').val()) || _.isEmpty(this.$('input#password').val())) {
        this.$('.alert').show();
        return;
      }
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

    url: 'http://istalkerapp.appspot.com/list/'

  });

  var Stalk = Backbone.View.extend({

    render: function() {
      var template = _.template($("#template").html())
      this.$el.html(template({
        id: this.model.get('celebrityid'),
        name: this.model.get('celebrityname'),
        when: '5 minutes ago',
        where: this.model.get('location'),
        comment: this.model.get('comment')
      }))
      return this;
    }

  });

  var View = Backbone.View.extend({

    initialize: function() {
      this.collection = new StalkLine();
    },

    render: function() {
      this.collection.fetch({
        success: _.bind(this.addStalk, this)
      })
      return this;
    },

    addStalk: function(collection) {
      collection.each(function(model)  {
        this.$('.list').append(new Stalk({ model: model }).render().$el);
      }, this);
    }

  });

  return View;
})(window.Backbone, window._, window.jQuery)