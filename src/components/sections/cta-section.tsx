import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-800 z-0"></div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 z-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
            Whether you have a specific project in mind or just want to explore possibilities, I'm always open to discussing new opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-indigo-900 bg-white rounded-full hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
