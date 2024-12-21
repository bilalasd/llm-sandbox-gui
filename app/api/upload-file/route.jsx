import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
// import { v4 as uuidv4 } from "uuid";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  //   const filename = file.name.replaceAll(" ", "_");

  const uniqueId = crypto.randomUUID();
  const extension = file.name.split(".").pop();
  const filename = `${uniqueId}.${extension}`;
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/images/" + filename),
      buffer
    );
    return NextResponse.json({ Message: "Success", status: 201, filename });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
