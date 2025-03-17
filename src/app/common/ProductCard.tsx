import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-64">
      <div className="relative">
        <Image 
          width={400}
          height={250}
          alt={product.name}
          src={product.image}
          className="w-full h-40 object-cover"
        />
        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {product.tag}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">${product.price}</p>

        <Link href={`/product/${product.id}`}>
          <button className="mt-3 w-full bg-[#3e15e2ef] text-white py-2 rounded hover:bg-[#3a3992]">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};
