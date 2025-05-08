export default function Projects() {
    return (
      <section id="projects" className="py-20 px-6 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Weather App</h3>
            <p>A weather app that shows daily and weekly forecasts using real-time API data.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">Login System</h3>
            <p>Simple login/register app with PostgreSQL and Google Auth integration.</p>
          </div>
        </div>
      </section>
    );
  }
  