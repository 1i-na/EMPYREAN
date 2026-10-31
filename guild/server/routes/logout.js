import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out." });
  });
});

export default router;