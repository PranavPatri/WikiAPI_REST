const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

const article1 = new Article({
    title: "",
    content: ""
});

// article1.save();

///////////////////////////////Requests Targeting all Articles///////////////////////////////

app.route("/articles")

.get(function(req, res) {
    Article.find().then(function(foundArticles) {
        res.send(foundArticles);
    }).catch(function(err) {
        res.send(err);
    });
})

.post(function(req, res) {

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save().then(function(article) {
    }).catch(function(err) {
        if(!err) {
            res.send("Successfully added a new article to database.");
        }else {
            res.send(err);
        }
    });
    
})

.delete(function(req, res) {
    Article.deleteMany().then(function(err) {
        if(!err) {
            res.send("Successfully deleed all articles.");
        }else {
            res.send(err);
        }
    });
});

///////////////////////////////Requests Targeting A Specific Articles///////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req, res) {
    Article.findOne({title: req.params.articleTitle}).then(function(foundArticle) {
        if(foundArticle) {
            res.send(foundArticle);
        }else {
            res.send("No articles matching that title was found.");
        }
    }).catch(function(err) {
        console.log(err);
    });
})

.put(function(req, res) {
    Article.updateOne(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true}
    ).then(function(err) {
        if(!err) {
            res.send("Successfully updated article.");
        }else {
            res.send(err);
        }
    });
})

.patch(function(req, res) {
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: req.body}
    ).then(function(err) {
        if(!err) {
            res.send("Successfully updated article.");
        }else {
            res.send(err);
        }
    });
})

.delete(function(req, res) {
    Article.deleteOne(
        {title: req.params.articleTitle}
    ).then(function(err) {
        if(!err) {
            res.send("Successfully deleted the corressponding article.");
        }else {
            res.send(err);
        }
    });
});

app.listen(3000, function() {
    console.log("Server started at port 3000.");
});