const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    userType: {
      type: String,
      required: true,
    },
    email: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "email.model"
        type:String
    }
  },
  { timestamps: true }
);

// userSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
