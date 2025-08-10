// const authModel = require("../models/authModel");

// // Register controller
// const registerController = async (req, res) => {
//   const { title, tags, json_file_url } = req.body;

//   try {
//     const session = await authModel.create({
//       user_id: req.user.id,
//       title,
//       tags,
//       json_file_url,
//       status: "draft",
//     });

//     res.status(200).json({
//       success: true,
//       msg: "Session created successfully",
//       session,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       msg: "Error creating session",
//       error: error.message,
//     });
//   }
// };

// module.exports = {registerController};