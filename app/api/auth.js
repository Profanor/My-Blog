import passport from "passport";
import LocalStrategy from "passport-local";
import User from "@/models/User";

const handler = nextConnect();

//express-session
handler.use(require("express-session")({
    secret: "i love games",
    resave: false,
    saveUninitialized: false
}));
handler.use(passport.initialize());
handler.use(passport.session());

//configure passport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

export default handler;