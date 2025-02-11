import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;