import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../users/user.model.js";
import { env } from "../../config/env.js";

export const registerUser = async (userData) => {

  const existingUser = await User.findOne({
    phone: userData.phone,
  });

  if (existingUser) {
    throw new Error("Phone number already registered");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (phone, password) => {

  const user = await User.findOne({
    phone,
  });

  if (!user) {
    throw new Error("Invalid phone number or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid phone number or password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  const { password: _, ...userWithoutPassword } = user.toObject();

  return {
    user: userWithoutPassword,
    token,
  };
};