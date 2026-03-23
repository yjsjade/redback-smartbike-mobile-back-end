import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Bike route working" });
});

export default router;