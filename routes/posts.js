const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

router.post("/", (req, res) => {
   const post = {
      title: req.body.title,
      author: req.body.author,
      timestamp: req.body.timestamp,
      isPublished: req.body.isPublished,
   };
   if (req.body.isPublished) {
      post.publishedDate = new Date().getTime();
   }
   postsController
      .create(post)
      .then((result) => {
         res.status(201).json(result);
      })
      .catch((err) => {
         res.status(err.status || 500).json(err);
      });
});

router.get("/", (req, res) => {
   //    console.log(req.query);
   const info = {
      author: req.query.author,
      isPublished:
         req.query.isPublished === "true"
            ? true
            : req.query.isPublished === "false"
               ? false
               : req.query.isPublished,
   };
   postsController.find(info).then((data) => {
      res.status(200).json(data);
   });
});

router.get("/:id", (req, res) => {
   const id = req.params.id;
   postsController.post(id).then((data) => {
      if (data) res.status(200).json(data);
      else res.status(404).send('ID not found');
   });
});

router.patch("/:id", (req, res) => {
   res.status(405).json();
});

router.put("/:id", (req, res) => {
   res.status(405).json();
});

router.delete("/:id", (req, res) => {
   res.status(405).json();
});
module.exports = router;
