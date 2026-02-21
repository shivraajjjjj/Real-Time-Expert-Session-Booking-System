const expertRouter = require("express").Router();
const { allexperts,getExpertById} = require("../controllers/expertController");
// Get all experts
expertRouter.get("/", allexperts);

// Get expert by ID
expertRouter.get("/:id", getExpertById);

module.exports = expertRouter;