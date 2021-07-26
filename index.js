const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const session = require("express-session");
const homeRoutes = require("./routes/home");
const cartRoutes = require("./routes/cart");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const ordersRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const varMiddleware=require('./middleware/variables');

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(varMiddleware);

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url =
      "mongodb+srv://Vlados:147852369@cluster0.rskwa.mongodb.net/shop?w=majority";
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    // const candidate = await User.findOne();
    // if (!candidate) {
    //   const user = new User({
    //     email: "novalenkov@ukr.net",
    //     name: "Vlados",
    //     cart: { items: [] },
    //   });
    //   await user.save();
    // }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
