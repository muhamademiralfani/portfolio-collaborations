import cloudinary from "../config/cloudinary.js";
import path from "path";
import fs from "fs";
import Project from "../models/projectModel.js";
export const createProject = async (req, res) => {
  const project = req.body;
  const images = req.files;
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

  if (!images) {
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
    const uploadResults = await Promise.all(
      images.map(async (file, index) => {
        const publicId = `${newProject._id}-${index}`;
        const result = await cloudinary.uploader.upload(
          path.resolve(file.path),
          {
            folder: "projects",
            public_id: publicId,
            overwrite: true,
          }
        );
        fs.unlinkSync(file.path);
        return result.secure_url;
      })
    );

    const technologies = project.technologies
      .trim()
      .split(",")
      .map((tech) => tech.trim());

    newProject.images = uploadResults;
    newProject.technologies = technologies;
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
    const data = await Project.findById(id);
    const images = data.images;

    const deleteImage = await Promise.all(
      images.map((imageLink) => {
        const arrayLink = imageLink.split('/');
        const publicId = `${arrayLink[arrayLink.length - 2]}/${arrayLink[arrayLink.length - 1].split(".")[0]}`
        return cloudinary.uploader.destroy(publicId);
      })
    );    

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
  const images = req.files;

  try {
    const uploadResults = await Promise.all(
      images.map(async (file, index) => {
        const publicId = `${id}-${index}`;
        const result = await cloudinary.uploader.upload(
          path.resolve(file.path),
          {
            folder: "projects",
            public_id: publicId,
            overwrite: true,
          }
        );
        fs.unlinkSync(file.path);
        return result.secure_url;
      })
    );

    const technologies = project.technologies
      .trim()
      .split(",")
      .map((tech) => tech.trim());

    project.images = uploadResults;
    project.technologies = technologies;
    const updatedProject = await Project.findByIdAndUpdate(id, project, {
      new: true, // Return the updated document
    });
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(`Error: ${error.message}`);
  }
};
