import mongoose from "mongoose";

const rescuerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    available: {
      type: Boolean,
      default: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
  },
  {
    timestamps: true,
  }
);

rescuerSchema.index({
  location: "2dsphere",
});

export default mongoose.model(
  "Rescuer",
  rescuerSchema
);