import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Enquiry from "@/models/Enquiry";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📥 Received new Enquiry form submission:", body);

    const {
      name,
      email,
      countryCode = "+91",
      phone,
      company,
      domain,
      candidates,
      mode,
      location,
    } = body;

    // Basic Validation
    if (!name || !email || !phone || !company || !domain || !mode) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Connect to MongoDB using Mongoose
    await connectToDatabase();

    const fullPhone = `${countryCode} ${phone}`.trim();

    // Create new enquiry document in MongoDB
    const newEnquiry = await Enquiry.create({
      name,
      email,
      countryCode,
      phone,
      fullPhone,
      company,
      domain,
      candidates: candidates ? Number(candidates) || candidates : null,
      mode,
      location: location || "",
    });

    console.log("✅ Successfully saved Enquiry to MongoDB Atlas:", newEnquiry._id);

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry saved to MongoDB successfully!",
        data: newEnquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ MongoDB Enquiry API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to submit enquiry to database.",
      },
      { status: 500 }
    );
  }
}
