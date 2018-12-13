const express = require("express");
const db = require(".././models");
const router = express.Router();

router.get("/", function(req, res) {
	res.render("index");
});

router.get("/index", function(req, res) {
	res.render("index");
});

router.get("/scraped", function(req, res) {
	db.Article.find({ saved: false }).then(function(dbArticle) {
		res.render("scraped", { articles: dbArticle });
    }).catch(function(err) {
        res.json(err);
    });

});

router.get("/saved", function(req, res) {
    db.Article.find({ saved: true }).populate("notes").then(function(dbArticle) {
        res.render("saved", { articles: dbArticle });
    }).catch(function(err) {
        res.json(err);
    });

 
})

module.exports = router;