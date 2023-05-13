const express = require('express');
const router = express.Router();
const { Blog } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
