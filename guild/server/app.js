import express from "express";
import session from "express-session";
import path from 'node:path';
import signupRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import meRouter from "./routes/me.js";
import logoutRouter from "./routes/logout.js";
import leaderboardRouter from "./routes/leaderboard.js";

const envPath = path.resolve(import.meta.dirname, '.env');
process.loadEnvFile(envPath);

const app = express();

app.use(express.json());

// setup session cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

// mount routes
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/me", meRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/leaderboard", leaderboardRouter);

// serve react app
app.use(express.static(path.resolve(import.meta.dirname, '../ridersguild/dist')));

app.use((req, res) => {
  res.status(404).json({message: 'Page not found'});
});

export default app;