const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(201).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    })
    res.status(201).json(tagId);
  } catch (error) {
    res.status(500).json(error);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    })
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.status(201).json(updatedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(201).json(deletedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
