import Hero from "../models/heroModel.js";

export const getHero = async (req, res) => {
  try {
    const hero = await Hero.find();
    res.status(200).json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.error(`Error: ${error.message}`);
  }
};

export const createHero = async (req, res) => {
  const hero = req.body;

  if (!hero.text) {
    return res
      .status(400)
      .json({ success: false, message: "Text is required" });
  }

  try {
    const checkExistingData = await Hero.findOne({ _id: "singleton" });
    // Check is data is already exist in database
    if (checkExistingData) {
      return res
        .status(409)
        .json({ success: false, message: "Data already exists" });
    }

    // If data doesn't exist in database then create a new data
    const newHero = new Hero({_id: "singleton", ...hero});
    await newHero.save();
    res.status(201).json({ success: true, data: newHero });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.error(`Error: ${error.message}`);
  }
};

export const updateHero = async (req, res) => {
  const id = "singleton";
  const hero = req.body;
  try {
    const updatedHero = await Hero.findByIdAndUpdate(id, hero, {
      new: true,
    });

    if (!updatedHero) {
      return res.status(404).json({ success: false, message: "Hero not found" });
    };

    res.status(200).json({ success: true, data: updatedHero });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.error(`Error: ${error.message}`);
  }
};
