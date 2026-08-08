import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  fullPhone: string;
  company: string;
  domain: string;
  candidates?: number | string;
  mode: string;
  location?: string;
  createdAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    countryCode: {
      type: String,
      required: true,
      default: "+91",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    fullPhone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    domain: {
      type: String,
      required: [true, "Domain selection is required"],
      trim: true,
    },
    candidates: {
      type: Schema.Types.Mixed,
      default: null,
    },
    mode: {
      type: String,
      required: [true, "Mode of delivery is required"],
      enum: ["online", "offline"],
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Enquiry || model<IEnquiry>("Enquiry", EnquirySchema);
