module.exports = function(app) {
  app.dataSources.herokudb.automigrate('user', function(err) {
    if (err) throw err;
    app.models.user.create([
      {vorname: 'Floda', nachname: 'relti', alter: "29", profession: "führer", city: "taij", umgezogen: "heute", auftrag: "chillen", interessen: "meine interessen"}
      ], function(err, users) {
      if (err) throw err;
 
      console.log('Models created: \n', users);
    });
  });
};