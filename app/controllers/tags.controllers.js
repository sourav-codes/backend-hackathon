const mongoose = require("mongoose");
const Tags = require("../models/tags.model");
const EmailsTrack = require("../models/emails-track.model");

// Retrieve and return all tags from the database.
module.exports.findAll = (req, res) => {
  Tags.find()
    .then((tag) => {
      res.send(tag);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving insurance.",
      });
    });
};

// Update a tag identified by the Tagid in the request
module.exports.update = (req, res) => {
  Tags.findOneAndUpdate(
    req.body.tagId,
    {
      Tag: req.body.tag,
    },
    { new: true }
  )
    .then((tag) => {
      if (!tag) {
        return res.status(404).send({
          message: "Not found",
        });
      }
      res.send(tag);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error updating tag with id ",
      });
    });
};

module.exports.TagAddOne = function (req, res) {
  Tags.create(
    {
      Tag: req.body.tag,
    },
    function (err, tag) {
      if (err) {
        console.log("Error creating Tag");
        console.log(err);
        res.status(400).json(err);
      } else {
        console.log("Tag Details created");
        res.status(201).json(tag);
      }
    }
  );
};

module.exports.findOne = function (req, res) {
  Tags.findOne({ _id: req.body.tagId }, function (err, tag) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result : ", tag);
      res.status(201).json(tag);
    }
  });
};

module.exports.delete = function (req, res) {
  Tags.findOneAndRemove({ _id: req.body.tagId }, function (err, tag) {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json(tag + "deleted Successfully");
    }
  });
};

module.exports.findTagFromList = async function (req, res) {
  var str = req.body.description;
  var words = str.split(" ");
  console.log(words);
  var j = 0;
  for (var i = 0; i < words.length; i++) {
    const result = await Tags.find({ Tag: words[i] }).then(function (err, tag) {
      if (err) {
        console.log(err);
        if (err.length) {
          j++;
        }
      } else {
        console.log(tag);
      }
    });
  }

  if (j >= 1) {
    const mail = await EmailsTrack.findOneAndUpdate(  { _id: req.body.emailId }, {
      status: "SPOOF",
    });
    res.status(201).json("Mail marked Spoof");
  } else {
    res.status(201).json("Mail marked not Spoof");
  }
};
