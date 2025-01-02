// Import the Equipment model to interact with the database
const Equipment = require("../models/Equipment");

// Controller to handle adding a new equipment item
// This function takes the equipment details from the request body, creates a new document,
// saves it to the database, and sends a response with a success message and the created item.
const addEquipment = async (req, res) => {
  const { title, lessee, category, availability, price, description, image } =
    req.body;
  const newequipment = new Equipment({
    title: req.body.title,
    lessee: req.body.lessee,
    category: req.body.category,
    availability: req.body.availability,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
  });
  await newequipment.save();
  res.status(201).json({
    message: "EQUIPMENT CREATED SUCCESSFULLY",
    newequipment,
  });
};

// Controller to fetch all equipment items
// Retrieves all the equipment records from the database and sends them in the response.
const allEquipment = async (req, res) => {
  const getallequipment = await Equipment.find();
  res.json(getallequipment);
};

// Controller to fetch a particular equipment item
// Finds an equipment item by its ID (provided in the URL params) and sends it in the response.
const particularEquipment = async (req, res) => {
  const equipmentId = await Equipment.findById(req.params.id);
  res.json(equipmentId);
};

// Controller to update an equipment item
// Updates the equipment item identified by the ID (from URL params) with new details
// provided in the request body and sends a success message with the updated item.
const updateEquipment = async (req, res) => {
  const { title, lessee, category, availability, price, description, image } =
    req.body;
  const updateproduct = await Equipment.findByIdAndUpdate(
    req.params.id,
    {
      title: title,
      lessee: lessee,
      category: category,
      availability: availability,
      price: price,
      description: description,
      image: image,
    },
    { new: true } // Ensures the response contains the updated document
  );
  res.status(201).json({
    message: "EQUIPMENT UPDATED SUCCESSFULLY",
    updateproduct,
  });
};

// Controller to delete an equipment item
// Deletes the equipment item identified by the ID (from URL params) and sends a success message.
// If the equipment doesn't exist, logs an error message in the console.
const deleteEquipment = async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "EQUIPMENT DELETED SUCCESSFULLY",
    });
  } catch (error) {
    console.log("EQUIPMENT DOES NOT EXIST", error);
  }
};

// Exporting all controller functions for use in routes
module.exports = {
  addEquipment,
  allEquipment,
  particularEquipment,
  updateEquipment,
  deleteEquipment,
};
