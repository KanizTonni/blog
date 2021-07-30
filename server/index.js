const express = require('express')
const mysql = require("mysql");
const cors = require("cors");
const { response } = require('express');

const app = express()

app.use(express.json());
app.use(cors());

{/**database connection */}
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'post_application',
});

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL connected!!!....")
    }
})

{/**sign up */}
app.post('/register', (req, res) => {
    const full_name = req.body.full_name;
    const username = req.body.username;
    const password = req.body.password;
    const phone = req.body.phone;

    db.query("INSERT INTO users (username, password, full_name, phone) VALUES (?,?,?,?)",
    [username, password, full_name, phone],
    (err, result) => {
        if(err) {
            res.send({err: err})
        } else {
            res.send(result)
        }
    });
});

{/**log in */}
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
        if(err) {
            res.send({err: err})
        }

        if(result.length > 0) {
            res.send(result)
        } else {
            res.send({message: "Wrong password or username"})
        }
    });
});

{/**post submit*/}
app.post('/postSubmit', (req, res) => {
    const post = req.body.post;
    const id = req.body.id;

    db.query("INSERT INTO posts (user_id, post_desc) VALUES (?,?)",
    [id, post],
    (err, result) => {
        res.send(result)
    });
});

{/**for viewing posts */}
app.post('/postView', (req, res) => {
    const id = req.body.id;

    db.query("SELECT * FROM posts INNER JOIN users ON users.id = posts.user_id AND users.id = ?",
    [id],
    (err, result) => {
        if(err) {
            res.send({err: err})
        }

        if(result.length > 0) {
            res.send(result)
        } else {
            res.send({message: "No post to show"})
        }
    });
});


{/**update post */}
app.post('/updateSubmit', (req, res) => {
    const postId = req.body.postId;
    const post =  req.body.post;
    db.query("UPDATE posts SET post_desc = ? WHERE Id = ?",
    [post, postId],
    (err, result) => {
        res.send(result)
    });
});


{/**delete post */}
app.post('/deletePost', (req, res) => {
    const postId = req.body.postId;

    db.query("DELETE FROM posts WHERE Id = ?",
    [postId],
    (err, result) => {
        res.send(result)
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
})