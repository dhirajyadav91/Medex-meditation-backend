const express = require("express");
const router = express.Router();
const { RequiredSign } = require("../middlewares/authMiddleware");
const {
    getPublicSessionsController,
    getMySessionsController,
    getSingleSessionsController,
    saveDraftController,
    publishSessionsController
} = require("../controllers/sessionController");

// Public routes
router.get("/get-sessions", getPublicSessionsController);

// Auth-protected routes
router.get("/my-sessions", RequiredSign, getMySessionsController);
router.get("/my-sessions/:id", RequiredSign, getSingleSessionsController);
router.post("/my-sessions/save-draft", RequiredSign, saveDraftController);
router.post("/my-sessions/publish", RequiredSign, publishSessionsController);

module.exports = router;
