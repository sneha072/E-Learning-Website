import jwt from "jsonwebtoken";

const generateTokenSetCookie = (userId, res) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,           // ✅ for HTTPS (Vercel + Render)
    sameSite: "None",       // ✅ required for cross-origin
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export default generateTokenSetCookie;
