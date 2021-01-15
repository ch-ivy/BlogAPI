const Posts = require("../models/posts");

const create = async (post) => {
   return Posts.create({
      title: post.title,
      author: post.author,
      timestamp: post.timestamp,
      publishedDate: post.publishedDate,
      isPublished: post.isPublished,
   });
};

const find = async (info) => {
   if (info.author && info.isPublished) {
      if (typeof info.isPublished !== "boolean") {
         return Posts.findAll({
            attributes: ["author"],
            order: ["id"],
         });
      } else {
         return Posts.findAll({
            attributes: ["isPublished", "author"],
            order: ["id"],
         });
      }
   } else
      return Posts.findAll({
         order: ["id"],
      });
};

const post = async (id) => {
   return Posts.findByPk(id);
};
module.exports = { create, find, post };
