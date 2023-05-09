const customerModel=require("../models/customerModel")
const orderModel=require("../models/orderModel")
const discountModel=require("../models/discountModel")
const nameRegex=/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i
const {isValidObjectId}=require("mongoose")


const createCustomer=async function(req,res){
    try{
        let name = req.body.name
      
        if(name && typeof name != "string") return res.status(400).send({status:false,message:"name should be in string"})
        if(!name || !name.trim())return res.status(400).send({status:false,message:"name is mandaory"})
        if(!nameRegex.test(name.trim())) return res.status(400).send({status:false,message:"Invalid name."})

        const data=await customerModel.create({ name : name})
        
        return res.status(201).send({status:true,message:"Success",data:data})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}
