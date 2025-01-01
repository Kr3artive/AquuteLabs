// Import necessary modules
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For creating JWT tokens
const crypto = require("crypto"); // For generating random OTPs
const nodemailer = require("nodemailer"); // For sending emails
const User = require("../models/Users"); // Mongoose model for User

// Registration endpoint
const register = async (req, res) => {
  const { surname, name, email, password } = req.body;
  const secret = process.env.JWT_KEY; // JWT secret key from environment variables

  try {
    // Check if a user with the provided email already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(409).json({
        message: "USER ALREADY EXISTS",
      });
    } else {
      // Hash the user's password for secure storage
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate a 6-digit OTP for email verification
      const otp = crypto.randomInt(100000, 999999).toString();

      // Create a new user instance
      const user = new User({
        surname,
        name,
        email,
        password: hashedPassword, // Store hashed password
        isVerified: false, // By default verification status is false until OTP is verified
        otp, // Store OTP for verification
        otpExpires: Date.now() + 2 * 60 * 1000, // OTP expires in 2 minutes
      });

      // Generate a JWT token for the user
      const token = await jwt.sign({ user: email, userId: user._id }, secret, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      // Save the user to the database
      await user.save();

      // Configure the email transporter for sending the OTP
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use Gmail service
        auth: {
          user: process.env.EMAIL_USER, // Email address from environment variables
          pass: process.env.EMAIL_PASS, // Email password or app password
        },
      });

      // Email options for sending the OTP
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email address
        to: email, // Recipient's email address
        subject: "VERIFY YOUR EQUIPMENT ACCOUNT", // Email subject
        text: `Hello ${name},\n\nYour OTP for verification is: ${otp}`, // Email body
      };

      // Attempt to send the OTP via email
      try {
        await transporter.sendMail(mailOptions);
        console.log("OTP SENT TO", email); // Log success
      } catch (error) {
        console.error("ERROR SENDING OTP:", error); // Log failure
        return res.status(500).json({
          message: "ERROR SENDING OTP",
          error: error.message,
        });
      }

      // Send success response to the client
      res.status(201).json({
        message:
          "REGISTRATION SUCCESSFUL! CHECK YOUR EMAIL FOR OTP TO VERIFY ACCOUNT",
        user,
        token,
      });
    }
  } catch (err) {
    // Handle unexpected errors during registration
    res.status(500).json({
      message: "ERROR DURING REGISTRATION",
      error: err.message,
    });
  }
};

// OTP verification endpoint
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email and OTP, ensuring the OTP is not expired
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() }, // Check OTP expiration
    });

    if (!user) {
      return res.status(400).json({ message: "INVALID OR EXPIRED OTP" }); // Bad request: OTP is invalid or expired
    }

    // Mark the user as verified and clear OTP-related fields
    user.isVerified = true;
    user.otp = undefined; // Clear OTP
    user.otpExpires = undefined; // Clear OTP expiration
    await user.save();

    res.status(200).json({ message: "ACCOUNT VERIFIED SUCCESSFULLY", user });
  } catch (err) {
    // Handle unexpected errors during OTP verification
    res.status(500).json({
      message: "ERROR DURING OTP VERIFICATION",
      error: err.message,
    });
  }
};

// Login endpoint
const login = async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.JWT_KEY; // JWT secret key from environment variables

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "USER NOT FOUND", // Not found: User does not exist
      });
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return res.status(403).json({
        message: "USER NOT VERIFIED. PLEASE VERIFY ACCOUNT", // Forbidden: User not verified
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "AUTH FAILED", // Unauthorized: Invalid credentials
      });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ user: email, userId: user._id }, secret, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Send success response to the client
    res.status(200).json({
      message: "AUTH SUCCESSFUL",
      user,
      token,
    });
  } catch (err) {
    // Handle unexpected errors during login
    res.status(500).json({
      message: "ERROR DURING LOGIN",
      error: err.message,
    });
  }
};

// Forget password (send OTP)
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "USER NOT FOUND",
      });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Set OTP and expiration in the user record
    user.otp = otp;
    user.otpExpires = Date.now() + 2 * 60 * 1000; // OTP valid for 2 minutes
    await user.save();

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "RESET YOUR EQUIPMENT PASSWORD",
      text: `Hello,\n\nYour OTP for resetting your password is: ${otp}\n\nThis OTP is valid for 2 minutes.`,
    };

    // Send OTP via email
    try {
      await transporter.sendMail(mailOptions);
      console.log("PASSWORD RESET OTP SENT TO", email);
      res.status(200).json({
        message: "PASSWORD RESET OTP SENT",
      });
    } catch (error) {
      console.error("ERROR SENDING PASSWORD RESET OTP:", error);
      res.status(500).json({
        message: "ERROR SENDING PASSWORD RESET OTP",
        error: error.message,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "ERROR DURING PASSWORD RESET REQUEST",
      error: err.message,
    });
  }
};

// Reset password (verify OTP and update password)
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find user by email and ensure OTP is not expired
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "INVALID OR EXPIRED OTP",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear OTP-related fields
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      message: "PASSWORD RESET SUCCESSFUL",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "ERROR DURING PASSWORD RESET",
      error: err.message,
    });
  }
};

// Export all controller functions
module.exports = { register, verifyOtp, login, forgotPassword, resetPassword };
