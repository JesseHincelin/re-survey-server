import { ObjectId, Schema, createCollection } from "../Config/mongoose.config.js";
import { emailIsValid } from "../Utils/regex.utils.js";
// import { USER_THEME } from "../Utils/user.utils.js";

export const USER_THEME = {
  LIGHT: "light",
  DARK: "dark",
};

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    // validate: {
    //   validator: (email) => emailIsValid(email),
    //   message: "Email is not valid",
    // },
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  userName: {
    type: String,
    required: [true, "Username required"],
  },
  projects: [{ type: ObjectId, ref: "Project" }],
  surveys: [{ type: ObjectId, ref: "Survey" }],
  panels: [{ type: ObjectId, ref: "Panel" }],
  theme: {
    type: String,
    default: USER_THEME.LIGHT,
    enum: [USER_THEME.LIGHT, USER_THEME.DARK],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verification token required"],
  },
});

const User = createCollection("User", userSchema);

export default User;
