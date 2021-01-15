const Posts = require("../models/posts");

const create = async (post) => {
   const data = {
      title: post.title,
      author: post.author,
      timestamp: post.timestamp,
      isPublished: post.isPublished,
   };
   if (post.publishedDate) data.publishedDate = post.publishedDate;
   return Posts.create(data);
};

const find = async (info) => {
   if (info.author || info.isPublished) {
      if (typeof info.isPublished !== "boolean" && !info.author) {
         return Posts.findAll();
      }
      if (typeof info.isPublished !== "boolean" && info.author) {
         return Posts.findAll({
            where: {
               author: info.author
            }
         })
      }
      else if (typeof info.isPublished === "boolean" && info.author) {
         return Posts.findAll({
            where: {
               author: info.author,
               isPublished: info.isPublished
            }
         })
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
