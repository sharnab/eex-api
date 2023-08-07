const validator = require("validator");
const userModel = require("../models/user.model");

const uniqueEmail = async (value) => {
  try {
    const user = await userModel.findOne({ email: value });
    if (user) {
      throw new Error("Email already exists");
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createUserValidationRules = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, phone, role, status } =
      req.body;

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !status
    ) {
      throw new Error("Please provide all required fields");
    }

    if (validator.isEmpty(data.username)) {
      throw new Error("Username field is required");
    } else if (!validator.isLength(data.username, { min: 5 })) {
      throw new Error("Username must be at least 5 characters");
    }

    if (validator.isEmpty(data.email)) {
      throw new Error("Email field is required");
    } else if (!validator.isEmail(data.email)) {
      throw new Error("Invalid email format");
    }

    if (validator.isEmpty(data.password)) {
      throw new Error("Password field is required");
    } else if (!validator.isLength(data.password, { min: 6 })) {
      throw new Error("Password must be at least 6 characters");
    }

    if (validator.isEmpty(data.confirmPassword)) {
      throw new Error("Confirm Password field is required");
    } else if (!validator.equals(data.password, data.confirmPassword)) {
      throw new Error("Passwords must match");
    }

    if (!validator.isInt(data.role)) {
      throw new Error("Invalid role");
    }

    if (!validator.isInt(data.status)) {
      throw new Error("Invalid status");
    }

    await uniqueEmail(email);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserValidationRules = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, phone, role, status } =
      req.body;

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !status
    ) {
      throw new Error("Please provide all required fields");
    }

    if (validator.isEmpty(data.username)) {
      throw new Error("Username field is required");
    } else if (!validator.isLength(data.username, { min: 5 })) {
      throw new Error("Username must be at least 5 characters");
    }

    if (validator.isEmpty(data.email)) {
      throw new Error("Email field is required");
    } else if (!validator.isEmail(data.email)) {
      throw new Error("Invalid email format");
    }

    if (!validator.isInt(data.role)) {
      throw new Error("Invalid role");
    }

    if (!validator.isInt(data.status)) {
      throw new Error("Invalid status");
    }

    await uniqueEmail(email);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUserValidationRules,
  updateUserValidationRules,
};
