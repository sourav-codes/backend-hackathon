const EmailsTrack = require("../models/emails-track.model");
const { isEmailSpoof } = require("../services/email-verify");
const { body, validationResult } = require("express-validator");

module.exports.getEmail = [
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { emailId } = req.body;
    try {
      if (emailId) {
        const cm = await EmailsTrack.findById(emailId);

        if (cm) {
          res.status(201).json({ cm });
        } else throw Error("email  Not Found");
      } else {
        const cm = await EmailsTrack.find();

        if (cm) {
          res.status(201).json({ cm });
        } else throw Error("email Not Found");
      }
    } catch (err) {
      let error = err.message;
      res.status(400).json({ error: error });
    }
  },
];

module.exports.create = [
  body("mailInboxId").not().isEmpty().withMessage("email field is required"),
  body("senderEmailId").not().isEmpty().withMessage("email field is required"),
  body("receiverName")
    .not()
    .isEmpty()
    .withMessage("receivername field is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      mailInboxId,
      senderEmailId,
      senderName,
      receiverName,
      receiverEmailId,
      body,
      emailContent,
      metaInfo,
      domain
    } = req.body;
    try {
      const isMailExist = await EmailsTrack.findOne({ mailInboxId, receiverEmailId });

      if (isMailExist) {
        return res.status(200).json({
          results: {
            data: [],
            isMailIndexAlreadyExist: true,
            status: isMailExist?.status || 'PENDING',
            error: false
          }
        })
      }
      const mailSpoofFlag = isEmailSpoof(senderEmailId, senderName);

      const data = await EmailsTrack.create({
        mailInboxId,
        senderEmailId,
        senderName,
        receiverName,
        body,
        emailContent,
        metaInfo,
        domain,
        status: mailSpoofFlag ? 'SPOOF' : 'PENDING'
      });
      return res.status(200).json({
        results: {
          data,
          isMailIndexAlreadyExist: false,
          status: data.status,
          error: false
        }
      })
    } catch (err) {
      let error = err.message;
      res.status(400).json({ error: error });
    }
  },
];

module.exports.modifyEmail = [
  body("emailId").not().isEmpty().withMessage("email field is required"),
  // body("sentBy").not().isEmpty().withMessage("sentby field is required"),
  // body("emailType").not().isEmpty().withMessage("emailtype field is required"),
  // body("receiverName")
  //   .not()
  //   .isEmpty()
  //   .withMessage("receivername field is required"),
  // body("domain").not().isEmpty().withMessage("domain field is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      emailId,
      email,
      sentBy,
      emailType,
      receiverId,
      receiverName,
      body,
      status,
      receivedBy,
      blockReason,
      blockedBy,
      emailContent,
      metaInfo,
      domain,
    } = req.body;
    try {
      const mail = await EmailsTrack.findOneAndUpdate(
        { _id: emailId },
        {
          email,
          sentBy,
          emailType,
          receiverName,
          body,
          status,
          receivedBy,
          blockReason,
          blockedBy,
          emailContent,
          metaInfo,
          domain,
        }
      );
      if (mail) {
        // const cm = await EmailsTrack.findById(emailId);
        res
          .status(201)
          .json({ message: "email Updated Successfully", Email: mail });
      } else throw Error("No email  Found");
    } catch (err) {
      let error = err.message;
      res.status(400).json({ error: error });
    }
  },
];

module.exports.deleteEmail = [

  body('emailId').not().isEmpty().withMessage("emailId is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { emailId } = req.body;
    try {
      const mail = await EmailsTrack.findByIdAndDelete({ _id: emailId });
      if (mail) {
        res.status(201).json({ message: "email Removed Successfully" + mail });
      } else
        throw Error("no email Found")
    }
    catch (err) {
      let error = err.message
      res.status(400).json({ error: error });
    }
  }
]
