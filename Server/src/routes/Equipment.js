const express = require("express");

const {
  addEquipment,
  allEquipment,
  particularEquipment,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/Equipment");

const router = express.Router();

router.post("/addequipment", addEquipment);
router.get("/allequipment", allEquipment);
router.get("/particularequipment/:id", particularEquipment);
router.put("/updateequipment/:id", updateEquipment);
router.delete("/deleteequipment/:id", deleteEquipment);

module.exports = router;