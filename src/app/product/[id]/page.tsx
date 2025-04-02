"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import type { Product } from "@/types/product";
import Image from "next/image";
import { useUser } from "@clerk/nextjs"; 

export default function Product() {
  const { id } = useParams();
  const { user } = useUser(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [buyAmount, setBuyAmount] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchProductAndComments() {
      try {
        const productResponse = await fetch(`/api/products/${id}`);
        const productData = await productResponse.json();
        setProduct(productData);
  
        const commentsResponse = await fetch(`/api/comments?productId=${id}`); // Pass product ID
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchProductAndComments();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const handleIncrease = () => setBuyAmount((prev) => prev + 1);
  const handleDecrease = () => setBuyAmount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: buyAmount,
      };
  
      // Get the current cart from localStorage, or create an empty array if it doesn't exist
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Add the new item to the cart (checking for duplicates)
      const updatedCart = [...existingCart, cartItem];
  
      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  
      alert('Product added to cart!');
    }
  };
  

  interface Comment {
    comment: string;
    userName: string;
    userProfilePicture: string;
    date: string;
  }


  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (newComment.trim() !== "" && user) {
      const comment: Comment = {
        comment: newComment,
        userName: user.firstName || "Anonymous",
        userProfilePicture: user.imageUrl || "/default-avatar.jpg",
        date: new Date().toISOString(),
      };
  
      try {
        const response = await fetch("/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: id, comment }), // Include product ID
        });
  
        if (response.ok) {
          setComments([...comments, comment]); // Update the local state
          setNewComment(""); // Clear the input field
        } else {
          console.error("Failed to submit comment");
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  return (
    <div className="mt-24 mb-24 px-8 lg:px-32 mx-[20%]">
      <section className="flex flex-col lg:flex-row items-center gap-10">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            width={600}
            height={400}
            src={product.image || "/default-image.jpg"}
            alt={product.name}
            className="rounded-lg shadow-lg"
          />
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
            <button
  onClick={handleAddToCart}
  className="bg-[#3e15e2ef] text-white px-6 py-2 rounded hover:bg-[#3a3992]"
>
  Add to Cart
</button>
          </div>
        </div>
      </section>

      {/* Comment Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {user ? (
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
        ) : (
          <p className="text-gray-500">Please log in to leave a comment.</p>
        )}

        <div className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 p-8 rounded-lg text-black">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="p-3 mb-3 border-[#ffffff] border-2 rounded-md">
                <div className="flex items-center gap-3">
                  <Image
                    width={40}
                    height={40}
                    src={comment.userProfilePicture}
                    alt={comment.userName}
                    className="rounded-full border-[0.5px] border-[#ffffff]"
                  />
                  <div>
                    <p className="font-semibold">{comment.userName}</p>
                    <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-black">REVIEW ALGAA, BICHEEEREIIII!!!</p>
          )}
        </div>
      </section>
    </div>
  );
}
