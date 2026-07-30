const { default: mongoose } = require("mongoose");


const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:Number,
    city:String,
    email:{
        type:String,
        unique:true
    },
    course:{
         type:String,
        required:true,
    }
})
module.exports=mongoose.model("Student",studentSchema);
