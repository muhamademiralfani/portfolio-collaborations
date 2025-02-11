import Hero from "../models/heroModel.js";

export const getHero = async (req, res) => {
  try {
    const hero = await Hero.find();
    res.status(200).json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(`Error: ${error.message}`);
  }
};

export const createHero = async (req, res) => {
  const hero = req.body;

  if (!hero.text) {
    return res
      .status(400)
      .json({ success: false, message: "Text is required" });
  }

  const newHero = new Hero(hero);

  try {
    await newHero.save();
    res.status(201).json({ success: true, data: newHero });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(`Error: ${error.message}`);
  }
};

export const updateHero = async (req, res) => {
  const { id } = req.params;
  const hero = req.body;
  try {
    const updatedHero = await Hero.findByIdAndUpdate(id, hero, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedHero });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(`Error: ${error.message}`);
  }
};
