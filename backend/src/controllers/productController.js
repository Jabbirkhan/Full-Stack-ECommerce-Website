import { Product } from '../models/productModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { v2 as cloudinary } from "cloudinary";

const uploadProduct = async (req, res) => {
    try {

        let { name, description, category, subCategory, bestSeller, price, sizes } = req.body

        if (!name || !description || !category || !subCategory || !price || !sizes) {
            return res.status(400).json({ success: false, message: "All Fields are required" });
        }

        if (sizes) {
            try {
                sizes = JSON.parse(sizes);
            } catch (error) {
                sizes = sizes.split(',').map(size => size.trim());
            }
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter(image => image !== undefined);
        if (images.length === 0) {
            return res.status(400).json({ success: false, message: "All images are required" });
        }

        const imagesPath = images.map(image => image.path);
        const uploadImages = await Promise.all(imagesPath.map(path => uploadOnCloudinary(path)));

        const product = await Product.create({
            images: uploadImages.map(image => image.secure_url),
            name,
            description,
            category,
            subCategory,
            price: Number(price),
            bestSeller: bestSeller === "true" ? "true" : "false",
            sizes,
        });

        if (!product) {
            return res.json({ success: false, message: "Product is not added" })
        }

        return res.status(201).json({ success: true, message: "Product added successfully", product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, description, category, subCategory, bestSeller, price, sizes } = req.body

        if (!name || !description || !category || !subCategory || !price || !sizes) {
            return res.status(400).json({ success: false, message: "All Fields are required" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        if (sizes) {
            try {
                sizes = JSON.parse(sizes);
            } catch (error) {
                sizes = sizes.split(',').map(size => size.trim());
            }
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter(Boolean);

        // If we did not have new images then we saved the old images
        const finalImages = product.images;

        // Delete old images from cloudinary if we have images and then uploading new images
        if (images.length > 0) {
            await Promise.all(
                product.images.map(image => {
                    const publicId = image.split('/').pop().split('.')[0];
                    return cloudinary.uploader.destroy(publicId);
                })
            )
            const imagesPath = images.map(image => image.path);
            const uploadImages = await Promise.all(imagesPath.map(path => uploadOnCloudinary(path)));
            finalImages = uploadImages.map((image) => image.secure_url);
        }

        product.images = finalImages;
        if (name) product.name = name;
        if (description) product.description = description;
        if (category) product.category = category;
        if (subCategory) product.subCategory = subCategory;
        if (price) product.price = Number(price);
        product.bestSeller = bestSeller === true ? true : false;
        if (sizes) product.sizes = sizes;

        const updatedproduct = await product.save();
        if (!updatedproduct) {
            return res.status(400).json({ success: false, message: "Product not updated!" });
        }

        return res.status(200).json({ success: true, message: "Product updated successfully", product: updatedproduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { availability } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        product.available = availability === true ? true : false;

        const updatedproduct = await product.save();
        if (!updatedproduct) {
            return res.status(400).json({ success: false, message: "Product not updated!" });
        }

        return res.status(200).json({ success: true, message: "Product updated successfully", product: updatedproduct });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const productList = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 1;
        // const search = req.query.search?.trim() || "";

        if (page < 1) page = 1;
        if (limit < 1) limit = 1;

        const skip = (page - 1) * limit;

        // Sorting
        const sortType = req.query.sort || 'Relevent';

        let sort = { createdAt: -1 };
        if (sortType === 'Low-High') sort = { price: 1 };
        if (sortType === 'High-Low') sort = { price: -1 };

        // Filtering
        let filter = {};

        // if (search) {
        //     filter.name = {
        //         $regex: search,
        //         $options: "i"
        //     };
        // }

        const category = req.query.category
            ? Array.isArray(req.query.category)
                ? req.query.category
                : [req.query.category]
            : [];

        const subCategory = req.query.subCategory
            ? Array.isArray(req.query.subCategory)
                ? req.query.subCategory
                : [req.query.subCategory]
            : [];

        if (category.length > 0) filter.category = { $in: category };
        if (subCategory.length > 0) filter.subCategory = { $in: subCategory };

        const products = await Product.find(filter).sort(sort).skip(skip).limit(limit);
        const newProducts = await Product.find().sort({ createdAt: -1 });

        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({ success: true, products, totalProducts, newProducts, totalPages, currentPage: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product is not Found" });
        }

        await Promise.all(
            product.images.map(image => {
                const parts = image.split('/');
                const fileName = parts.pop();
                const publicId = fileName.split(".")[0];
                return cloudinary.uploader.destroy(publicId);
            })
        )

        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { uploadProduct, updateProduct, updateAvailability, productList, deleteProduct };