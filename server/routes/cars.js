const express = require('express');
const router = express.Router();
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controllers/carController');
const auth = require('../middleware/auth');

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', auth, createCar);
router.put('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);

module.exports = router;
