const sessionModel = require("../models/sessionModel.js");

const getPublicSessionsController = async (req, res) => {
  const sessions = await sessionModel.find({ status: "published" });
  res.json(sessions);
};

const getMySessionsController = async (req, res) => {
  const sessions = await sessionModel.find({ user_id: req.user.id });
  res.json(sessions);
};

const getSingleSessionsController = async (req, res) => {
  const session = await sessionModel.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!session) return res.status(404).json({ msg: "Not found" });
  res.json(session);
};

//Sessions Creating/Updating this Controller
const saveDraftController = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;
  let session;
  if (id) {
    session = await sessionModel.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      { title, tags, json_file_url, status: "draft", updated_at: Date.now() },
      { new: true }
    );
  } else {
    session = await sessionModel.create({
      user_id: req.user.id,
      title,
      tags,
      json_file_url,
      status: "published",
    });
  }
  res.json(session);
};

const publishSessionsController = async (req, res) => {
  const { id } = req.body;
  const session = await sessionModel.findOneAndUpdate(
    { _id: id, user_id: req.user.id },
    { status: "published", updated_at: Date.now() },
    { new: true }
  );
  if (!session) return res.status(404).json({ msg: "Not found or not yours" });
  res.json(session);
};

module.exports = {
  getPublicSessionsController,
  getMySessionsController,
  getSingleSessionsController,
  saveDraftController,
  publishSessionsController,
};
