import Project from "../models/projectModel.js";
export const createProject = async (req, res) => {
  const project = req.body;
  const errors = [];

  if (!project.title) {
    const message = "Title is required";
    errors.push({ path: "title", message });
  }

  if (!project.description) {
    const message = "Description is required";
    errors.push({ path: "description", message });
  }

  if (!project.technologies) {
    const message = "Technologies is required";
    errors.push({ path: "technologies", message });
  }

  if (!project.images) {
    const message = "Images is required";
    errors.push({ path: "images", message });
  }

  if (!project.content) {
    const message = "Content is required";
    errors.push({ path: "content", message });
  }

  if (!project.slug) {
    const message = "Slug is required";
    errors.push({ path: "slug", message });
  } else {
    const existingProject = await Project.findOne({ slug: project.slug });
    if (existingProject) {
      const message = "Slug already exists";
      errors.push({ path: "slug", message });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    const newProject = Project(project);
    await newProject.save();
    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(`Error: ${error.message}`);
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    const summary = projects.map((project) => ({
      id: project._id,
      title: project.title,
      description: project.description,
      tags: project.technologies,
      slug: project.slug,
      thumb: project.images[0],
    }));
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(`Error: ${error.message}`);
  }
};

export const getProjectDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal sever error" });
    console.log(`Error: ${error.message}`);
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(`Error: ${error.message}`);
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const project = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, project, {
      new: true, // Return the updated document
    });
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(`Error: ${error.message}`);
  }
};
