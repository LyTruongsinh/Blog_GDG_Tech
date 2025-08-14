const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const authRoutes = require("./routers/auth");
const homeRoutes = require("./routers/home");
const commentRoutes = require("./routers/comment");

const app = express();
const PORT = process.env.PORT || 8000;
require("dotenv").config();

// Kết nối MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect MongoDB:", err));
  mongoose.set('debug', true);
// Middleware


app.use(cors({
  origin: ["https://blog-tech-sigma.vercel.app", "http://localhost:3000", "https://gdgblogtech.hungproject.app"],
  methods: ["GET", "POST", 'PUT', 'DELETE'], 
  credentials: true 
}));


app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Bỏ qua OPTIONS request
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cấu hình express-session
app.set('trust proxy', 1);
app.use(
  session({
    secret: "yourSecretKey", 
    resave: false,
    saveUninitialized: false,
    proxy: true,
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI,
      collectionName: "sessions", 
    }),
    cookie: {
      maxAge: 180 * 60 * 1000, // Thời gian sống của cookie (180 phút)
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true,
    },
  })
);

// Cấu hình Static Files
app.use("/images", express.static("public/images")); 

// Định nghĩa các route với prefix
app.use("/", authRoutes); 
app.use("/", homeRoutes); 
app.use("/", commentRoutes); 



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
