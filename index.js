import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//Home
app.get("/", (req, res) => {
    reassignIDs();
    res.render(__dirname + "/views/index.ejs", { blogs: blogs });
})

//Blog
app.get("/blog/:id", (req, res) => {
    res.render(__dirname + "/views/blog_page.ejs", { blog: blogs[req.params.id] });
})

//New Blog
app.get("/post_new_page", (req, res) => {
    res.render(__dirname + "/views/post_new_blog.ejs", {blog: -1})
})

app.post("/post_blog", (req, res) => {
    reassignIDs();
    blogs.push(addNewPost(req.body, res))
    res.redirect("/");
})


//Delete Blog
app.post("/delete-blog/:id", (req,res) => {
    deleteBlog(req.params.id);
    res.redirect("/");
})


//Change Blog
app.post("/update-blog/:id", (req,res) => {
    res.render(__dirname + "/views/post_new_blog.ejs", {blog: blogs[req.params.id]});
})

app.post("/save-update/:id", (req,res) => {
    updateBlog(req.body, req.params.id);
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

function reassignIDs(){
    for(let i = 0; i<blogs.length; i++){
        blogs[i].id = i;
    }
}

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

function updateBlog(body,id){
    blogs[id].title = body.title;
    blogs[id].content = body.content;
    blogs[id].preview = body.content.substring(0,200);
}