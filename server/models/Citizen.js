import mongoose from "mongoose";
import bcrypt from "bcrypt";

const CitizenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    wardNumber: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: "Unknown",
    },
    role: {
      type: String,
      enum: ["citizen"],
      default: "citizen",
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
CitizenSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
CitizenSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Remove password from response
CitizenSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Citizen", CitizenSchema);
