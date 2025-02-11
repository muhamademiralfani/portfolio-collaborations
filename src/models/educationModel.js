import mongoose from "mongoose"

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true
    }, 
    institution : {
        type: String,
        required: true
    }, 
    courses: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
})


const Education = mongoose.model("Education", educationSchema);
export default Education