import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    listing:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"listings"
    }],
    booking:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"bookings"

    }]
},{
    timestamps:true  // creates a new field of timestamp which automatically stores the times when use is created
})

const Client = mongoose.model('clients',userSchema)

export default Client