export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white p-4 shadow-lg h-60 text-center max-w-screen">
      <section className="px-[15%] mt-10 flex gap-96">
        <div className="flex gap-10">
          <div className="flex flex-col">
            <h1 className="font-bold pb-4">About Us</h1>
            <p>Our team</p>
            <p>Organization</p>
            <p>Extra information</p>
          </div>
          <div>
            <h1 className="font-bold pb-4">Social Media</h1>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>
        </div>
<div className="border-[0.1px] h-30 border-white"></div>

        <div>
          <h1 className="font-bold pb-4">Contact Us</h1>
          <p>Email: support@shopboard.com</p>
          <p>+1 (800) 123-4567</p>
        </div>
      </section>
    </footer>
  );
}
