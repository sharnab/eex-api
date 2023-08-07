const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model.js");
const userModelInstance = new userModel();
const {
  // userValidationRulesOnCreate,
  // userValidationRulesOnUpdate,
  createUserValidationRules,
  updateUserValidationRules,
} = require("../middlewares/user.validator.js");

const jwt = require("jsonwebtoken");

const loginUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  console.log(await bcrypt.hash(req.body.password, 10));
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const findUser = await userModelInstance.findByCredentials({
    email,
    password,
  });

  if (!findUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  if (!findUser) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  } else {
    const accessToken = await jwt.sign(
      {
        user: {
          username: findUser.username,
          email: findUser.email,
          id: findUser.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  }

  // const refreshToken = generateRefreshToken(findUser?._id);
  // const updateUser = await userModel.findByIdAndUpdate(
  //   findUser?._id,
  //   {
  //     refreshToken: refreshToken,
  //   },
  //   {
  //     new: true,
  //   }
  // );

  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   maxAge: 72 * 60 * 60 * 1000,
  // });
});

// const registerUser = asyncHandler(async (req, res, next) => {
//   try {
//     const { id } = req?.user;
//     const { body } = req;
//     try {
//       await userValidationRulesOnCreate.validate(body, {
//         abortEarly: false,
//         stripUnknown: true,
//       });
//     } catch (error) {
//       console.error(error.message);
//       return res.status(400).json({ success: false, message: error.errors });
//     }

//     const photo = req?.file;
//     // save data to DB
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const userData = {
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//       phone: req.body.phone,
//       photo: photo?.filename,
//       role: req.body.role,
//       status: req.body.status,
//       createdBy: id,
//     };

//     try {
//       const user = await userModel.create(userData);
//       // console.log(user);
//     } catch (error) {
//       console.log(error.message);
//     }
//     // const user = await userModel.create(data);

//     res.json({ success: true });
//   } catch (err) {
//     next(err);
//   }
// });

// const editUser = asyncHandler(async (req, res, next) => {
//   try {
//     const { id } = req?.user;
//     const { body } = req;
//     try {
//       await userValidationRulesOnUpdate.validateSync(body, {
//         abortEarly: false,
//         stripUnknown: true,
//         // context: { isNew: false }, // pass isNew variable into validation context
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ success: false, message: error.errors });
//     }

//     const userId = req.params.id;
//     const photo = req?.file;

//     const user = await userModel.findOneAndUpdate(
//       { _id: userId },
//       {
//         username: req.body?.username,
//         email: req.body?.email,
//         phone: req.body?.phone,
//         photo: photo?.filename,
//         role: req.body?.role,
//         status: req.body?.status,
//         updatedBy: id,
//       },
//       {
//         returnOriginal: false,
//       }
//     );
//     res.send(`Updating user with ID ${userId}`);
//   } catch (err) {
//     next(err);
//   }
// });

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).json({ message: "Users found", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No user found" });
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No user found" });
  }
});

const deletePhoto = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const user = await userModel.findOneAndUpdate(
      { _id: id },
      {
        photo: "",
      },
      {
        returnOriginal: false,
      }
    );
    res.send(`Photo deleted successfully`);
  } catch (error) {
    next(error.message);
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }

    const userId = req.params.id;

    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        status: 2,
      },
      {
        returnOriginal: false,
      }
    );
    res.send(`Deleted the user with ID ${userId}`);
  } catch (error) {
    next(error.message);
  }
});

// Create user function
const addUser = async (req, res) => {
  try {
    const { username, email, password, phone, role, status } = req.body;

    // image upload
    const photo = req?.file;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user data object
    const userData = {
      username,
      photo: photo?.filename,
      email,
      password: hashedPassword,
      phone,
      role,
      status,
      createdBy: req.user.id,
    };

    // Save the user data
    const user = await userModel.create(userData);

    // Send success response
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    if (error.message.startsWith("E11000")) {
      res.status(500).json({ message: "Sorry! This mail is already in use." });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Update user function
const editUser = async (req, res) => {
  try {
    const { username, email, phone, role, status } = req.body;

    // Find the user by ID
    const user = await userModel.findById(req.params.id);
    // upload image
    const photo = req?.file;

    // Update the user data
    user.username = username;
    user.photo = photo?.filename;
    user.email = email;
    user.phone = phone;
    user.role = role;
    user.status = status;

    // Save the updated user data
    const updatedUser = await user.save();

    // Send success response
    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    if (error.message.startsWith("E11000")) {
      res.status(500).json({ message: "Sorry! This mail is already in use." });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  loginUser,
  getUser,
  editUser,
  deletePhoto,
  deleteUser,
};

const customErrorFormatter = (errors) => {
  const errorObj = {};
  errors.forEach((error) => {
    const path = error.path;
    const message = error.message;
    errorObj[path] = message;
  });
  return errorObj;
};
