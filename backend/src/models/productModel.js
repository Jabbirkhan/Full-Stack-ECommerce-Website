import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    images:{
        type:Array,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    bestSeller:{
        type:Boolean,
        required:true
    },
    available:{
        type:Boolean,
        default:true,
    }
},{timestamps:true});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);