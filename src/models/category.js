const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            unique:true,
            required:true
        },
        subcategories:[
            {
                name:{
                    type:String,
                    unique:true,
                    required:true
                }
            }
        ],

        created_by:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vendor",
                },
                created_at: {
                    type: Date,
                    default: Date.now,
                  },
                },
                { timestamps: true }   
)

module.exports = mongoose.models.Category || mongoose.model("Category", CategorySchema);