import express from 'express';
import { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview } from '../controllers/productController.js';
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js';


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router

