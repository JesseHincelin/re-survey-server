import { sendMail } from "../Config/mailer.config.js";
import { userDao } from "../DAOS/user.dao.js";
import { compareHash, hashed } from "../Utils/hash.utils.js";
import { jwtSign } from "../Utils/jwt.utils.js";
import { passwordIsValid } from "../Utils/regex.utils.js";
import { userInfos } from "../Utils/user.utils.js";

const register = async (req, res) => {
  const { email, password, userName } = req.body;

  const { userByEmail, errorByEmail } = await userDao.findByEmail(email);
  if (!!userByEmail)
    return res.status(400).json({ message: "This adress is not valid or already used" });

  const passwordIsOk = passwordIsValid(password);
  if (!passwordIsOk)
    return res.status(400).json({ message: "Password is not valid or not strong enough" });

  const { hashedPassword, hashedError } = await hashed(password);
  if (!hashedPassword || !!hashedError) return res.status(400).json({ message: hashedError });

  const { user, error } = await userDao.register(userName, email, hashedPassword);
  if (!user || !!error) return res.status(400).json({ message: error });

  sendMail(
    user.email,
    "verification link",
    `${process.env.LINK_VERIFICATION_BASE}${user._id}/${user.verificationToken}`
  );

  res.status(201).json({ message: "Registered successfully", user: userInfos(user) });
};

const verifyEmail = async (req, res) => {
  const { userId, verificationToken } = req.params;

  const { userVerification, errorVerification } = await userDao.verifyEmail(
    userId,
    verificationToken
  );
  if (!userVerification || !!errorVerification)
    return res.status(400).json({ message: errorVerification });

  res
    .status(200)
    .json({ message: "Email verified successfully", user: userInfos(userVerification) });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const loginErrorMessage = "Email adress or password incorrect";

  const { userByEmail, errorByEmail } = await userDao.findByEmail(email);
  if (!!errorByEmail || !userByEmail) return res.status(401).json({ message: loginErrorMessage });

  const { match, err } = await compareHash(password, userByEmail.password);
  if (!!err || !match) return res.status(401).json({ message: loginErrorMessage });

  const token = jwtSign(userByEmail.id);

  res.status(200).json({ message: "Login successfull", user: userInfos(userByEmail), token });
};

const autoLogin = async (req, res) => {
  const { userId } = req.body;

  const { userById, errorById } = await userDao.findById(userId);
  if (!!errorById || !userById) return res.status(401).json({ message: errorById });

  res.status(200).json({ message: "Login successfull", user: userInfos(userById) });
};

const emailTest = async (req, res) => {
  const { userId, subject, message } = req.body;

  const { userById, errorById } = await userDao.findById(userId);
  if (!userById || !!errorById) return res.status(400).json({ message: errorById });

  sendMail(userById.email, subject, message);
  sendMail(process.env.EMAIL_SENDER, "test email", `email have been sent to ${userById.email}`);

  res.status(200).json({ message: "Email sent, you may need to check you spam inbox." });
};

export const userController = {
  register,
  verifyEmail,
  login,
  autoLogin,
  emailTest,
};
