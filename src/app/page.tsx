import Navbar from "@/components/navbar.js";
import Products from "./Products/page";

export default function Ecommerce() {
  // const [cart, setCart] = useState([]);
  // const addToCart = (product: Product) => {
  //   setCart([...cart, product]);
  // };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen">
      <Navbar />
      {/* HERO */}
      <section className="pt-64 mb-10 text-center px-6">
        <h1
          className="text-5xl font-bold mb-6"
        >
          Discover the Future of Tech
        </h1>

        <p className="text-slate-400 mb-8">
          Latest gadgets curated for you
        </p>

        <button className="bg-cyan-600 px-6 py-3 rounded-2xl hover:bg-cyan-800">
          Browse Deals
        </button>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto py-16">
        <h2 className="text-3xl my-10">Trending Products</h2>
        <div className="grid md:grid-cols-5 gap-6">
          <Products />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-slate-500 py-10 border-t border-slate-800">
        © 2026 TechStore
      </footer>
    </div>
  );
}