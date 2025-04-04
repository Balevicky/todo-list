const express = require("express");
const app = express();
const session = require("express-session");
const port = 3000;
// app.use("/static", express());
// const tasks = [
//   {
//     title: "Apprendre à programmer",
//     done: false,
//   },
//   {
//     title: "Faire une course",
//     done: true,
//   },
// ];

// console.log(tasks);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================ session des users
app.use(
  session({
    // secret: "Ksn5glFOhOlXGmhUUYgVGkGKmbHVf6CM",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.set("view engine", "ejs");

// =============== methode post
app.post("/task", (req, res) => {
  console.log(req.body);

  if (req.body.task) {
    req.session.tasks.push({
      title: req.body.task,
      done: false,
    });
  }
  res.redirect("/");
});
// =============== methode get by id pour modifier
app.get("/task/:id/done", (req, res) => {
  if (req.session.tasks[req.params.id]) {
    req.session.tasks[req.params.id].done = true;
  }
  res.redirect("/");
});
// =============== methode get by id pour supprimer
app.get("/task/:id/delete", (req, res) => {
  if (req.session.tasks[req.params.id]) {
    req.session.tasks.splice(req.params.id, 1);
  }
  console.log(req.session.tasks);

  res.redirect("/");
});
// =============== methode get
app.get("/", (req, res) => {
  if (!req.session.tasks) {
    req.session.tasks = [];
  }

  res.render("todo-list", { tasks: req.session.tasks });
});

app.listen(port, () => {
  console.log(`Serveur lancé au port ${port}`);
});
