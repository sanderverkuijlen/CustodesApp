angular.module('dataService', ['ngResource']).
    factory('Credential', function($resource) {

      var self = this;

      var Credential = $resource('http://localhost:49708\:49708/api/credential/:id',
          { apiKey: '4f847ad3e4b08a2eed5f3b54' }, {
            create: { method: 'POST' },
            update: { method: 'PUT' }
          }
      );

      Credential.prototype.query = function(cb) {
        console.log(cb);

        return Credential.query({}, this, cb);
      };

      Credential.prototype.create = function(cb) {
        return Credential.create({}, this, cb);
      };

      Credential.prototype.update = function(cb) {
        return Credential.update({ id: this.Id }, this, cb);
      };

      Credential.prototype.remove = function(cb) {
        return Credential.remove({ id: this.Id }, this, cb);
      };

      Credential.prototype.destroy = function (cb) {
        return Credential.remove({ id: this.Id }, this, cb);
      };

      return Credential;
    }).
    factory('Authentication', function($http) {

      var authorized = false;

      this.isAuthorized = function() {
        return authorized;
      }

      this.login = function(email, password, callback) {

        var hashedEmail = CryptoJS.SHA3(email, { outputLength: 256 });
        var hashedPassword = CryptoJS.SHA3(password, { outputLength: 256 });

        $http.defaults.headers.common['Custodes-Email']     = hashedEmail;
        $http.defaults.headers.common['Custodes-Password']  = hashedPassword;

        $http({ method: 'GET', url: 'http://localhost:49708/api/authentication' }).
          success(function(data, status, headers, config) {

            authorized = true;
            callback(true, data, status, headers, config);
          }).
          error(function(data, status, headers, config) {

            authorized = false;
            callback(false, data, status, headers, config);
          });
      };

      this.logout = function() {
        authorized = false;

        delete $http.defaults.headers.common['Custodes-Email'];
        delete $http.defaults.headers.common['Custodes-Password'];
      }

      return this;
    });