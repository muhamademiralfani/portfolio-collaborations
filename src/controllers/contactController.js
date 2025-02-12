import Contact from "../models/contactModel.js";

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(`Error: ${error.message}`);
  }
};

export const createContact = async (req, res) => {
    const {name, email, message} = req.body
    
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    } else if (!email) {    
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    } else if (!message) {    
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }
    const newContact = new Contact({name, email, message});
    try {
        await newContact.save()
        res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
        console.log(`Error: ${error.message}`);

    }
}