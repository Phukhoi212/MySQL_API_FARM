const fs = require("fs");

const db = require("../models/images.js");
const Image = db.images;

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);
    const hostName = req.protocol + "://" + req.hostname + ":4000";
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/assets/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/assets/tmp/" + image.name,
        image.data
      );

      return res.send({
        link: hostName + "/resources/assets/uploads/" + req.file.filename
      });
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};