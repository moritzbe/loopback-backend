module.exports = function(app) {
  var loopback = require('loopback');
  var User = app.models.User;
  var ACL = app.models.ACL;
  User.hasMany(app.models.metauser, { as: 'metausers', foreignKey: 'userId' });
  ACL.create({
    accessType: ACL.ALL,
    permission: ACL.ALLOW,
    principalType: ACL.ROLE,
    principalId: '$owner',
    model: 'User',
    property: '__get__times'
  });
};