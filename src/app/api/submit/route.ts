import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = request.json();
    console.log("Received form data:", formData);

    setTimeout(() => {
      console.log("Data processing .....");
    }, 2000);

    return NextResponse.json(
      { message: "Data Submitted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
