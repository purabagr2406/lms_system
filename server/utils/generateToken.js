import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d"
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,         // ✅ Required for HTTPS (Render uses HTTPS)
    sameSite: "None",     // ✅ Required for cross-origin frontend/backend
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  return res.status(200).json({
    success: true,
    message,
    user
  });
};
