module.exports = function(Metauser) {
	var app = module.exports = loopback();
	app.models.Metauser.beforeRemote('create', function(ctx, modelInstance, next) {
		ctx.args.data.userId = ctx.req.accessToken.userId;
		next();
	});
};
