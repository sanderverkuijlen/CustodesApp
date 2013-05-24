app.factory('MainSettings', function () {
  var mainSettings = {};
  mainSettings.connStrings = {
    credentialConnString: 'http://localhost:49708\:49708/api/credential/:id',
    authenticationConnString: 'http://localhost:49708/api/authentication'
  };

  return mainSettings;
});