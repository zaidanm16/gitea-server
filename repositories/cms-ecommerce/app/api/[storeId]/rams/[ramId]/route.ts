import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { ramId: string } }
) {
  try {
    if (!params.ramId) {
      return new NextResponse("RAM id is required", { status: 400 });
    }

    const ram = await prismadb.ram.findUnique({
      where: {
        id: params.ramId,
      },
    });

    return NextResponse.json(ram);
  } catch (error) {
    console.log("[RAM_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { ramId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.ramId) {
      return new NextResponse("RAM id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const ram = await prismadb.ram.delete({
      where: {
        id: params.ramId,
      },
    });

    return NextResponse.json(ram);
  } catch (error) {
    console.log("[RAM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { ramId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.ramId) {
      return new NextResponse("RAM id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const ram = await prismadb.ram.update({
      where: {
        id: params.ramId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(ram);
  } catch (error) {
    console.log("[RAM_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
