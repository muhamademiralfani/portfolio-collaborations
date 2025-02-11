import Education from "../models/educationModel.js";

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find();
    res.status(200).json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(`Error: ${error.message}`);
  }
};

export const createEducation = async (req, res) => {
    const education = req.body
    if (!education.degree) {
      return res
        .status(400)
        .json({ success: false, message: "Degree is required" });
    } else if (!education.institution) {
      return res
        .status(400)
        .json({ success: false, message: "Institution is required" });
    } else if (!education.courses) {
      return res
        .status(400)
        .json({ success: false, message: "Courses is required" });
    } else if (!education.startDate) {
      return res
        .status(400)
        .json({ success: false, message: "Start Date is required" });
    } else if (!education.endDate) {
      return res
        .status(400)
        .json({ success: false, message: "End Date is required" });
    }

    const newEducation = new Education(education)
    try {
        await newEducation.save()
        res.status(201).json({ success: true, data: newEducation });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
        console.log(`Error: ${error.message}`);
        
    }
}

export const updateEducation = async (req, res) => {
    const { id } = req.params;
    const education = req.body
    try {
        const updateEducation = await Education.findByIdAndUpdate(id, education, {
            new: true
        })
        res.status(200).json({ success: true, data: updateEducation });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
        console.log(`Error: ${error.message}`);
    }
}

export const deleteEducation = async (req, res) => {
    const {id} = req.params;
    try {
        await Education.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Education deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
        console.log(`Error: ${error.message}`);
    }
}