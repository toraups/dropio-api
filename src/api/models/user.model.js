import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Utils
const transform = (doc, ret) => {
  const { _id, __v, password, ...rest } = ret;
  return {
    id: _id.toString(),
    ...rest,
    v: __v,
  };
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      match: [
        /^[A-Za-z]+(?:[-'][A-Za-z]+)*(?: [A-Za-z]+(?:[-'][A-Za-z]+)*){0,3}$/,
        "Name must contain only letters and may include hyphens or apostrophes (e.g., John, Mary-Jane, O'Connor). Up to 4 words allowed",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Enter a valid email address (e.g., example@mail.com)",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      match: [
        /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/,
        "Password must be at least 8 characters long and include at least one letter and one number.",
      ],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toObject: { transform },
    toJSON: { transform },
  },
);

// Hash modified password
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Check password match
userSchema.methods.verifyPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
