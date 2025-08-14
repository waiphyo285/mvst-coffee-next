import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop')`,
        }}
      ></div>

      <div className="relative z-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          ROASTED COFFEE
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300">
          Choose a coffee from below or create your own.
        </p>
        <button className="btn-primary text-lg">ORDER YOUR FAVOURITE</button>
      </div>

      {/* Coffee Cup Image */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="relative w-96 h-96">
          <Image
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop"
            alt="Coffee Cup"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
