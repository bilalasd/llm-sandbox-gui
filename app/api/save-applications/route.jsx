import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req) => {
  const applications = await req.json();

  try {
    const filePath = path.join(process.cwd(), "public", "applications.json");
    await fs.writeFile(filePath, JSON.stringify(applications, null, 2));
    return NextResponse.json({ message: "Applications saved successfully" });
    // res.status(200).json({ message: "Applications saved successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save applications" });
    // res.status(500).json({ error: "Failed to save applications" });
  }
};
