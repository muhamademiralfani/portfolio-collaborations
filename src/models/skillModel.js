import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    skill_name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: false
    }
})

const Skill = mongoose.model("Skill", skillSchema)
export default Skill