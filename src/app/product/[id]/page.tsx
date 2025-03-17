"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import type { Product } from "@/types/product";
import Image from "next/image";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [buyAmount, setBuyAmount] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");


  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const handleIncrease = () => setBuyAmount((prev) => prev + 1);
  const handleDecrease = () => setBuyAmount((prev) => (prev > 1 ? prev - 1 : 1));

  interface Comment {
    comment: string;
    text: string;
    date: string;
  }

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const comment: Comment = { comment: newComment, text: newComment, date: new Date().toISOString() };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-24 mb-24 px-8 lg:px-32 mx-[20%]">
      <section className="flex flex-col lg:flex-row items-center gap-10">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image width={600} height={400} src={product.image || "/default-image.jpg"} alt={product.name} className="rounded-lg shadow-lg" />
        </div>

        {/* Product price and info */}
        <div className="w-full lg:w-1/2 top-0">
          <h1 className="font-bold text-3xl">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700 mt-2">{product.price}</p>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button onClick={handleDecrease} className="px-3 py-1 hover:bg-gray-300 hover:rounded-md ml-1">
                <Minus />
              </button>
              <span className="px-5 py-1 text-lg font-semibold">{buyAmount}</span>
              <button onClick={handleIncrease} className="px-3 py-1 hover:bg-gray-300 hover:rounded-md mr-1">
                <Plus />
              </button>
            </div>
            <button className="bg-[#3e15e2ef] text-white px-6 py-2 rounded hover:bg-[#3a3992]">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Comment Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Leave a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
            Submit
          </button>
        </form>
        <div>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="p-3 border-b">
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to leave a review!</p>
          )}
        </div>
      </section>
    </div>
  );
}
