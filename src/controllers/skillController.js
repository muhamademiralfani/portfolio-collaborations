import Skill from "../models/skillModel.js";
import cloudinary from "../config/cloudinary.js";
import path from "path";
import fs from "fs";

export const getSkill = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSkill = async (req, res) => {
    const skill = req.body;
    const image = req.file

    if(image) {
        const logo = await cloudinary.uploader.upload(path.resolve(image.path), { folder : "logo-skills" });
        skill.logo = logo.secure_url;
        fs.unlinkSync(image.path)
    }


    if(!skill.skill_name) return res.status(400).send('Skill name is required');
    const newSkill = new Skill(skill);
    try {
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateSkill = async (req, res) => {
    const skill = req.body;
    const image = req.file

    if(image) {
        const logo = await cloudinary.uploader.upload(path.resolve(image.path), { folder : "logo-skills" });
        skill.logo = logo.secure_url;
        fs.unlinkSync(image.path)
    }

    const { id } = req.params;
    if(await Skill.findById(id) === null) {
        return res.status(404).json({
            message: 'Skill is not found'
        });
    }

    if(!Skill) return res.status(400).send('Skill is required');
    if(!id) return res.status(400).send('Id is required');

      try {
        const updatedSkill = await Skill.findByIdAndUpdate(id, skill, { new: true });
        res.status(200).json(updatedSkill);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteSkill = async (req, res) => {
    const { id } = req.params;
    if(!id) return res.status(400).send('Id is required');
    if(await Skill.findById(id) === null) {
        return res.status(404).json({
            message: 'Skill is not found'
        });
    }

    try {
        const deletedSkill = await Skill.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Skill deleted successfully',
            data: deletedSkill
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}