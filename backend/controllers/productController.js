import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})


const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ msg: 'Produto não encontrado' })
    }
})



const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    try {
        await product.remove()
        res.json({ message: 'Produto removido!!' })
    } catch (err) {
        res.status(400).json({ msg: 'Produto não encontrado' })
    }
})


const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Nome Produto',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Marca',
        category: 'Categoria',
        countInStock: 0,
        numReviews: 0,
        description: 'Descrição'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, description, image, brand, category, countInStock } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updateProduct = await product.save()
        res.json(updateProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


const createProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Você já fez sua avaliação deste produto!!!')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})



export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview }


