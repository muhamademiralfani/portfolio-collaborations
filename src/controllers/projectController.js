import Project from "../models/Project.js";
export const createProject = async (req, res) => {
  const project = req.body;

  if (!project.title || !project.desc) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const newProject = Project(project);

  try {
    await newProject.save();
    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
