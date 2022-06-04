const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/edit/:id', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.delete);
router.patch('/restore/:id', courseController.restore);
router.delete('/force/:id', courseController.forceDelete);
router.get('/:slug', courseController.detail);

module.exports = router;