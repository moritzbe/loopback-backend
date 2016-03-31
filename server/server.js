var loopback = require('loopback');
var boot = require('loopback-boot');
// Make sure to also put this in `server/server.js`
var PassportConfigurator = 
  require('loopback-component-passport').PassportConfigurator;


var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

var User = app.models.User;
  User.hasMany(app.models.metauser, { as: 'metausers', foreignKey: 'userId' });
var ACL = app.models.ACL;
  ACL.create({
    accessType: ACL.ALL,
    permission: ACL.ALLOW,
    principalType: ACL.ROLE,
    principalId: '$owner',
    model: 'User',
    property: '__get__times'
  });
