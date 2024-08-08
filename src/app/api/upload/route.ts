// src/pages/api/upload.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file uploads
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await new Promise<{ fields: any; files: any }>(
      (resolve, reject) => {
        const formidable = require("formidable");
        const form = formidable({ multiples: false });

        form.parse(req, (err: any, fields: any, files: any) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      }
    );

    const file = formData.files.file;
    const { name, type, filepath } = file;

    const fileBuffer = require("fs").readFileSync(filepath);

    const { data, error } = await supabase.storage
      .from("pets")
      .upload(`public/${name}`, fileBuffer, {
        contentType: type,
      });

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = await supabase.storage
      .from("your-bucket-name")
      .getPublicUrl(`public/${name}`);

    return NextResponse.json({ url: publicUrl || "" }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ error: `Method Not Allowed` }, { status: 405 });
}
