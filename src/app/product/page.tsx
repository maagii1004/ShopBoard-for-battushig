"use client";
import { useEffect, useState } from "react";
import { ProductCard } from "../common/ProductCard";
import { Product } from "@/types/product";
 


export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 mx-[20%] my-[5%]">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}
