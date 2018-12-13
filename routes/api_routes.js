const express = require("express");
const cheerio = require("cheerio");
const request = require("request");
const db = require(".././models");
const router = express.Router();

// Scrape Articles
router.get("/scrape", function(req, res) {
    db.Article.find({ saved: false }).remove().then(function() {
        console.log("Old articles purged");
    });
    request("https://www.nytimes.com/section/world", function(error, response, body) {
        const $ = cheerio.load(body);
        $(".highlights article h2").each(function(i, element) {
            let result = {
                title: $(this).children("a").text(),
                link: $(this).children("a").attr("href"),
                summary: $(this).parent().children(".summary").text()
            }
            
            db.Article.create(result).then(function(dbArticle) {
                console.log(dbArticle);
            }).catch(function(err) {
                return res.json(err);
            });
            
        });
    });
    res.send("Scrape Complete");
});

// Get All Articles
router.get("/articles/all", function(req, res) {
    db.Article.find({}).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

// Get New Articles
router.get("/articles/new", function(req, res) {
    db.Article.find({ saved: false }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

// Get Saved Articles
router.get("/articles/saved", function(req, res) {
    db.Article.find({ saved: true }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

// Mark Article as Saved / Unsaved
router.post("/articles/status/:id", function(req, res) {
    db.Article.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
    ).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

// Add a Note to an Article
router.post("/articles/notes/create/:id", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
        return db.Article.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { notes: dbNote._id } },
            { new: true }
        );
    }).then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

// Remove a Note from an Article
router.delete("/articles/notes/delete/:id", function(req, res) {
    db.Note.findByIdAndRemove({ _id: req.params.id }).then(function(dbNote) {
        res.json(dbNote);
    }).catch(function(err) {
        res.json(err);
    });
});

// Grab and Article and its Note
router.get("/articles/single/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("notes")
        .then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(err) {
            res.json(err);
        });
});

module.exports = router;