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
      sessionStorage.setItem('username', this.$('input#username').val());
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
      var template = _.template($("#template").html());
      this.$el.html(template(_.extend({}, this.model.toJSON(), {

      })));
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


window.DetailView = (function(Backbone, _, $) {

  var Celeb = Backbone.Model.extend({

    initialize: function(attr, options) {
      this.celebId = options.celebId;
    },

    url: function() {
      return 'http://istalkerapp.appspot.com/detail/' + this.celebId + '/' + sessionStorage.getItem('user_id') + '/';
    }

  });

  var View = Backbone.View.extend({

    events: {
      'click button.following': 'onFollowClick'
    },

    initialize: function() {
      this.model = new Celeb(null, { celebId: this.options.celebId });
      this.model.fetch({
        success: _.bind(this.renderCeleb, this)
      });
    },

    renderCeleb: function() {
      var template = _.template($("#template").html());
      this.$el.html(template(_.extend({}, this.model.toJSON(), {
        spottings: JSON.parse(this.model.get('spottings'))
      })));
      if (this.model.get('following') == 'true') {
        this.$('button.following').removeClass('btn-success').addClass('btn-danger').html('Stop Stalking');
      } else {
        this.$('button.following').addClass('btn-success').removeClass('btn-danger').html('Start Stalking');
      }
      return this;
    },

    onFollowClick: function() {
      if (this.model.get('following') == 'true') {
        $.ajax('http://istalkerapp.appspot.com/unfollow/', {
          type: "POST",
          data: JSON.stringify({celebrity_id: this.options.celebId, user_id: sessionStorage.getItem('user_id')}),
          dataType: 'json', 
          success: function() {
            this.model.set('following', 'false');
            this.$('button.following').addClass('btn-success').removeClass('btn-danger').html('Start Stalking');
          },
          context: this
        });        
      } else {
        $.ajax('http://istalkerapp.appspot.com/follow/', {
          type: "POST",
          data: JSON.stringify({celebrity_id: this.options.celebId, user_id: sessionStorage.getItem('user_id')}),
          dataType: 'json', 
          success: function() {
            this.model.set('following', 'true');
            this.$('button.following').removeClass('btn-success').addClass('btn-danger').html('Stop Stalking'); 
          },
          context: this
        });
      }
    }

  });

  return View;
})(window.Backbone, window._, window.jQuery)