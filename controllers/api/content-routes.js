const router = require('express').Router();
const { Content } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Content.findAll()
    .then(dbContentData => res.json(dbContentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Content.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbContentData => res.json(dbContentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
  if (req.session) {
    Content.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbContentData => {
        if (!dbContentData) {
          res.status(404).json({ message: 'No content found with this id!' });
          return;
        }
        res.json(dbContentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

module.exports = router;
