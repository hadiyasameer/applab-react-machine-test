const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white mb-10">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-widest text-purple-100">
          Best Deals Online
        </p>

        <h1 className="text-4xl md:text-5xl font-black mt-3 leading-tight">
          Shop the Latest Gadgets at Amazing Prices
        </h1>

        <p className="text-purple-100 mt-4 text-base md:text-lg">
          Discover headphones, watches, mobiles, and speakers with easy checkout
          and instant cart updates.
        </p>

        <button className="mt-6 bg-white text-purple-700 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all">
          Start Shopping
        </button>
      </div>
    </section>
  );
};

export default HeroSection;