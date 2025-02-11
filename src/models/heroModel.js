import mongoose from "mongoose";

const heroSchema = new mongoose.Schema ({
    _id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    }
});

const Hero = mongoose.model("Hero", heroSchema);
export default Hero;