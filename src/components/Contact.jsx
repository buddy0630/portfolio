export default function Contact() {
    return (
      <section id="contact" className="py-20 px-6 bg-gray-950 text-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>
        <form className="max-w-xl mx-auto flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="p-3 rounded bg-gray-800 text-white" />
          <input type="email" placeholder="Your Email" className="p-3 rounded bg-gray-800 text-white" />
          <textarea placeholder="Your Message" rows="5" className="p-3 rounded bg-gray-800 text-white"></textarea>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 p-3 rounded font-bold transition">
            Send
          </button>
        </form>
      </section>
    );
  }
  