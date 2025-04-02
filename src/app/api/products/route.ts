import { NextResponse } from "next/server";
import { products } from "./data";

export const GET = async () => {
  return NextResponse.json(products);
};


// export const GET = async (req: NextRequest) => {
//   const url = new URL(req.url);
//   const id = url.pathname.split("/").pop();

//   if (id) {
//     const product = products.find((p) => p.id === id);
//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }
//     return NextResponse.json(product);
//   }

//   return NextResponse.json(products);
// };