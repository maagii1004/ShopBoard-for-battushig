"use client";

export default function AboutUs() {
  return (
    <div className="mt-24 mb-24 px-8 lg:px-32 mx-[20%]">
      {/* About Us Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-xl text-gray-600">
          Welcome to ShopBoard! We are a team of passionate individuals who believe that shopping should be an enjoyable experience for everyone.
        </p>
        <p className="mt-4 text-xl text-gray-600">
          At ShopBoard, we bring you a wide range of products at competitive prices. We are dedicated to providing excellent customer service and ensuring that our customers have an easy and seamless shopping experience.
        </p>
        <p className="mt-4 text-xl text-gray-600">
          Our mission is to help you shop smarter by providing high-quality products at affordable prices, with the convenience of shopping from anywhere, anytime.
        </p>
        <h2 className="mt-8 text-2xl font-semibold">Our Vision</h2>
        <p className="mt-4 text-xl text-gray-600">
          We envision a world where people can shop with ease, get the best deals, and experience convenience with every purchase.
        </p>
      </section>

      {/* Contact Information Section */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="mt-4 text-xl text-gray-600">
          Have questions or need assistance? Reach out to us:
        </p>
        <p className="mt-4 text-xl text-gray-600">
          Email: support@shopboard.com
        </p>
        <p className="mt-2 text-xl text-gray-600">
          Phone: +1 (800) 123-4567
        </p>
      </section>
    </div>
  );
}
