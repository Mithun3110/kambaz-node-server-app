import express from 'express'
import mongoose from 'mongoose';
import Hello from "./Hello.js"
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import EnrollmentsRoutes from './Kambaz/Enrollments/routes.js';
import Lab5 from './Lab5/index.js'
import cors from "cors";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
import session from "express-session";
import "dotenv/config";
const app = express()
app.use(cors({
    credentials: true,
   origin: process.env.NETLIFY_URL || "http://localhost:5173",
}));
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
EnrollmentsRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app)
const port = process.env.PORT || 4000;
app.listen(port);

