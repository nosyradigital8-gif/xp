// FILE PATH: src/pages/Shop.tsx

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTASection from '../components/CTASection';
import { useCountry } from '../contexts/CountryContext';
import { useCart } from '../contexts/CartContext';
import {
  nigeriaProducts,
  canadaProducts,
  nigeriaCategories,
  canadaCategories,
  formatPrice,
  Product,
} from '@/data/shopData';


// ─── CART DRAWER ──────────────────────────────────────────────────────────────
const CartDrawer = () => {
  const navigate = useNavigate(); // ✅ CORRECT LOCATION

  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const currency = cart[0]?.currency;

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="font-montserrat font-bold text-xl text-gray-900">
              Your Cart
            </h2>
            {cartCount > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatPrice(item.price, item.currency)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 bg-white border rounded"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 bg-white border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 text-xs"
                    >
                      Remove
                    </button>
                    <p className="font-bold">
                      {formatPrice(
                        item.price * item.quantity,
                        item.currency
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span className="font-bold">
                {currency && formatPrice(cartTotal, currency)}
              </span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout'); // ✅ WORKING
              }}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};


// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (!product.inStock) return;
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="font-bold mt-3">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.description}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold">
          {formatPrice(product.price, product.currency)}
        </span>

        <button
          onClick={handleAdd}
          disabled={!product.inStock || adding}
          className="bg-primary text-white px-3 py-1 rounded-lg text-sm"
        >
          {adding ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};


// ─── MAIN SHOP PAGE ───────────────────────────────────────────────────────────
const Shop = () => {
  const { currentData } = useCountry();
  const { cartCount, setIsCartOpen } = useCart();

  const isNigeria = currentData.code === 'NG';
  const products = isNigeria ? nigeriaProducts : canadaProducts;
  const categories = isNigeria ? nigeriaCategories : canadaCategories;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />

      <section className="pt-32 pb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Shop</h1>

        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl"
        >
          View Cart ({cartCount})
        </button>
      </section>

      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Shop;
