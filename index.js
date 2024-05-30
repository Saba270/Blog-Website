import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", { blogs: blogs });
})

app.get("/blog/:id", (req, res) => {
    res.render(__dirname + "/views/blog_page.ejs", { blog: blogs[req.params.id] });
})

app.get("/post_new_page", (req, res) => {
    res.sendFile(__dirname + "/post_new_blog.html")
})

app.post("/post_blog", (req, res) => {
    blogs.push(addNewPost(req.body, res))
    res.redirect("/");
})

app.get("/delete-blog/:id", (req,res) => {
    deleteBlog(req.params.id);
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

let blogs = [{
    title: "Test Blog", content: "Nunc quis urna malesuada, congue orci vel, pulvinar turpis. Aliquam ac interdum mi. Ut aliquam diam eget leo ornare ultrices sed et metus. Nullam commodo dictum vulputate. Fusce bibendum placerat tortor eu lacinia. Morbi pretium, dui ut dictum consectetur, arcu massa eleifend enim, vel facilisis enim est at libero. Quisque at tincidunt sapien, id ultricies velit. In convallis est leo, aliquet lobortis nibh sollicitudin at. In mollis orci quis mi sollicitudin, faucibus scelerisque mauris molestie.",
    preview: "Nunc quis urna malesuada, congue orci vel, pulvinar turpis. Aliquam ac interdum mi. Ut aliquam diam eget leo ornare ultrices sed et metus. Nullam commodo dictum vulputate. Fusce bibendum placerat tort",
    id: 0
}];

function addNewPost(body, res) {
    const title = body.title;
    const content = body.content;
    const preview = content.substring(0, 200);
    return { title: title, content: content, preview: preview, id: blogs.length };
}

function deleteBlog(id){
    for(let i = 0; i<blogs.length; i++){
        if(blogs[i].id == id){
            let temp = blogs[blogs.length-1];
            blogs[blogs.length-1] = blogs[i];
            blogs[i] = temp;
            blogs.pop();
        }
    }
}