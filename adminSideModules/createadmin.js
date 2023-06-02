const express = require("express");
const router = express.Router();
const Admin = require("../models/adminSchema");

// Create Admin
router.post("/createAdmin", async (req, res) => {
  try {
    const { adminName, email, phone, adminPassword} = req.body;
    // Check if admin with the same email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Admin with this email already exists" });
    }

    // Create new admin
    const admin = new Admin({
      adminName,
      email,
      phone,
      adminPassword,
    //   cPassword,
    });
    // Save admin to the database
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
