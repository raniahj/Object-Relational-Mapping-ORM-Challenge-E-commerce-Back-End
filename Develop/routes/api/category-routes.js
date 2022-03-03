const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Find all categories
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [Product]
  })
    .then(allCategories => res.json(allCategories))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // Find a category by ID value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [Product]
  })
    .then(allCategories => res.json(allCategories))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // Create new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(newCategory => res.json(newCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // Update category by ID value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.json(category))
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // Delete category by ID value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(updatedCategory => {
      if (!updatedCategory) {
        res.status(404).json({ message: 'We cannot find a category with that id.' });
        return;
      }
      res.json(updatedCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
