angular.module('dataService', ['ngResource']).
    factory('Credential', function ($resource, $rootScope, Authentication, MainSettings) {

      //var self = this;

      var Credential = $resource(MainSettings.connStrings.credentialConnString,
          { apiKey: '4f847ad3e4b08a2eed5f3b54' }, {
            create: { method: 'POST' },
            update: { method: 'PUT' }
          }
      );

      Credential.queryDecrypt = function (cb) {
        Credential.query(function (results) {

          for (var i = 0; i < results.length; i++) {
            results[i].name = CryptoJS.AES.decrypt(results[i].name, Authentication.requestPassword()).toString(CryptoJS.enc.Utf8);
            results[i].login = CryptoJS.AES.decrypt(results[i].login, Authentication.requestPassword()).toString(CryptoJS.enc.Utf8);
            results[i].password = CryptoJS.AES.decrypt(results[i].password, Authentication.requestPassword()).toString(CryptoJS.enc.Utf8);
          }

          cb(results);
        });
      };


      Credential.getDecrypt = function (params) {
        return Credential.get(params, function (result) {
          result.name = CryptoJS.AES.decrypt(result.name, Authentication.requestPassword()).toString(CryptoJS.enc.Utf8);
          result.login = CryptoJS.AES.decrypt(result.login, Authentication.requestPassword()).toString(CryptoJS.enc.Utf8);
          result.password = CryptoJS.AES.decrypt(result.password, Authentication.requestPassword()).toString(CryptoJS.enc.Utf8);
        });
      };

      Credential.prototype.createEncrypt = function (cb) {
        var encrypted = CryptoJS.AES.encrypt(this.name, Authentication.requestPassword());
        this.name = encrypted.toString();
        encrypted = CryptoJS.AES.encrypt(this.login, Authentication.requestPassword());
        this.login = encrypted.toString();
        encrypted = CryptoJS.AES.encrypt(this.password, Authentication.requestPassword());
        this.password = encrypted.toString();
        return Credential.create({}, this, cb);
      };

      Credential.prototype.updateEncrypt = function (cb) {
        var encrypted = CryptoJS.AES.encrypt(this.name, Authentication.requestPassword());
        this.name = encrypted.toString();
        encrypted = CryptoJS.AES.encrypt(this.login, Authentication.requestPassword());
        this.login = encrypted.toString();
        encrypted = CryptoJS.AES.encrypt(this.password, Authentication.requestPassword());
        this.password = encrypted.toString();
        return Credential.update({ id: this.id }, this, cb);
      };

      Credential.prototype.destroy = function (cb) {
        return Credential.remove({ id: this.id }, this, cb);
      };

      return Credential;
    }).
    factory('Authentication', function ($http, MainSettings) {

      var self = this;

      var authorized = false;
      self.unencryptedPasswordKey = null;

      this.isAuthorized = function() {
        return authorized;
      };

      this.requestPassword = function () {
        return self.unencryptedPasswordKey;
      };

      this.login = function(email, password, callback) {

        var hashedEmail = CryptoJS.SHA3(email, { outputLength: 256 });
        var hashedPassword = CryptoJS.SHA3(password, { outputLength: 256 });

        $http.defaults.headers.common['Custodes-Email']     = hashedEmail;
        $http.defaults.headers.common['Custodes-Password']  = hashedPassword;

        $http({ method: 'GET', url: MainSettings.connStrings.authenticationConnString }).
          success(function(data, status, headers, config) {

            authorized = true;
            self.unencryptedPasswordKey = password;
            callback(true, data, status, headers, config);
          }).
          error(function(data, status, headers, config) {

            authorized = false;
            callback(false, data, status, headers, config);
          });
      };

      this.logout = function() {
        authorized = false;
        $http.defaults.headers.common['Custodes-Email'] = '';
        $http.defaults.headers.common['Custodes-Password'] = '';
      };

      return this;
    });
