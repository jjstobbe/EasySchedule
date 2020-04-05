const Koa = require("koa");
const serve = require("koa-static");
const mount = require("koa-mount");
const bodyParser = require("koa-bodyparser");
const authRoutes = require('./routes/auth-routes');

const passportSetup = require('./config/passport-setup');

// for passport support
// const session = require("koa-session");
// const passport = require("koa-passport");

const app = new Koa();
const static_pages = new Koa();
// const router = new router();

const PORT = process.env.PORT || 3000;

// app.use(session(app));
app.use(bodyParser());
static_pages.use(serve(__dirname + "/../build")); //serve the build directory
app.use(mount("/", static_pages));
app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());

// authentication
// app.use(passport.initialize());
// app.use(passport.session());

// Error handling middleware
/*
app.use(async(ctx, next) => {
	try {
		await next();
		if (ctx.state.api === true && ctx.status === 200) {
			ctx.body = {
				error: false,
				result: ctx.body
			};
		}
	} catch (err) {
		ctx.app.emit("error", err, this);
		ctx.status = err.status || 500;
		if (ctx.state.api === true) {
			return ctx.body = {
				error: true,
				message: err.message
			};
		}
		await ctx.render("error", {
			message: err.message,
			error: {}
		});
	}
});
*/

app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});
