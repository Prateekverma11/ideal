import {
  registerUser,
  loginUser,
} from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    const { password, ...userWithoutPassword } = user.toObject();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const login = async (req, res) => {
  try {

    const { phone, password } = req.body;

    const result = await loginUser(phone, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: error.message,
    });

  }
};