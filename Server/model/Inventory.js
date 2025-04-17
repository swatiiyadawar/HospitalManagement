const mongoose=require('mongoose');

const InventoryItemSChema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add item name"],
        trim:true
    },
    category:{
        type:String,
        required:[true,"please add item category"],
        enum:["Medicine","Equipment","Supply","Other"]
    },
    location:{
        type:String,
    },
    quantity:{
        type:Number,
        required:[true,'Please add quantity'],
        min:0
    },
    unitPrice:{
        type:Number,
        required:true
    },
    supplier: {
        name: String,
        contactInfo: String
      },
      expiryDate: {
        type: Date
      },
      reorderLevel: {
        type: Number,
        default: 10
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }


    })


    InventoryItemSChema.index({name:1});

    module.exports=mongoose.model('InventoryItem',InventoryItemSChema)

   