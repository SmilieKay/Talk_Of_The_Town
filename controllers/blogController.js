const express = require('express');
const router = express.Router();
// const { Blog, User } = require('../models');
// const db = require('../db/models');
const Blog = require('../db/models/Blog');



router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
