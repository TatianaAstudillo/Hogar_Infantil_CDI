import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    stats: {
      ninos: 8,
      profesores: 3,
      donaciones: 12450,
      stock: 637,
    },
  });
});

export default router;