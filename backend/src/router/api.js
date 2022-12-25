import { Router } from "express";
import firstPage from "../api/firstPageTable/index.js";
import secondPage from "../api/secondPageTable/index.js";

const router = new Router();

router.use("/firstPage", firstPage);
router.use("/secondPage", secondPage);

export default router;
