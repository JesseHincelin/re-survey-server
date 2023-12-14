import User from "../Models/user.model.js";
import crypto from "node:crypto";

const findByEmail = async (email) => {
  let userByEmail = null;
  let errorByEmail = null;

  try {
    userByEmail = await User.findOne({ email: email });
  } catch (e) {
    errorByEmail = `Email adress does not exist or is not valid : ${e.message}`;
  } finally {
    return { userByEmail, errorByEmail };
  }
};
const findById = async (userId) => {
  let userById = null;
  let errorById = null;

  try {
    userById = await User.findById(userId);
  } catch (e) {
    errorById = `Email adress does not exist or is not valid : ${e.message}`;
  } finally {
    return { userById, errorById };
  }
};

const register = async (userName, email, password) => {
  let error = null;
  let user = null;
  const newUser = {
    userName,
    email,
    password,
    verificationToken: crypto.randomBytes(32).toString("hex"),
  };

  try {
    user = await User.create(newUser);
  } catch (e) {
    error = `Cannot create this user : ${e.message}`;
  } finally {
    return { user, error };
  }
};

const verifyEmail = async (userId, verificationToken) => {
  let errorVerification = null;
  let userVerification = null;

  try {
    userVerification = await User.findById(userId);
    if (!userVerification) throw new Error("User not found, could not verify email");
    if (userVerification.verificationToken !== verificationToken)
      throw new Error("Email not verified");
    userVerification.verified = true;
    await userVerification.save();
  } catch (e) {
    errorVerification = `Could not verify the user email : ${e.message}`;
  } finally {
    return { userVerification, errorVerification };
  }
};

export const userDao = {
  findByEmail,
  findById,
  register,
  verifyEmail,
};
