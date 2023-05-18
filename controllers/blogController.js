const express = require('express');
const router = express.Router();
// const { Blog, User, Comment } = require('db\models');
const Blog = require('../models/Blog')



router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        { 
          model: User,
          attributes: ['username'],
        }
      ]
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { 
          model: User,
          attributes: ['username'],
        },
        { 
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        }
      ],
    });
    if (blogData) {
      const blog = blogData.get({ plain: true });
      res.render('blog', { blog });
    } else {
      res.status(404).json({ message: 'No blog found with that id!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
