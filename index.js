import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let blogs = [];
app.get("/", (req, res) => {
  res.render("index.ejs", { blogs: blogs });
});

app.get("/viewBlog", (req, res) => {
  res.render("viewBlog.ejs", {blogs: blogs});
});

app.get("/createBlog", (req, res) => {
  res.render("createBlog.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.post("/submit", (req, res) => {

  const newBlog = {
    title: req.body["postTitle"],
    context: req.body["blogContext"]
  };

  blogs.push(newBlog);

  res.redirect("/");
});

app.get("/delete/:index", (req, res) => {
  const blogIndex = req.params["index"];
  blogs.splice(blogIndex, 1);
  res.redirect("/viewBlog");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});