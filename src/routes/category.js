const express = require('express');
const router = express.Router();
const CategorysService = require('../src/services/category.service');

//instanciando el servicio
const service = new CategorysService();

//------------Method Get--------------------------
router.get('/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await service.findOne(categoryId);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get('/all', async (req, res) => {
  const categorys = await service.find();
  res.status(200).json(categorys);
});

//------------Method Post--------------------------

router.post('/create', async (req, res) => {
  const body = req.body; //guarda lo que recibe del postman y responde con un json
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
});

//------------Method Patch--------------------------

router.patch('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

//------------Method Patch--------------------------

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const category = await service.delete(id);
  res.json(category);
});

module.exports = router;
