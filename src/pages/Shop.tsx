// FILE PATH: src/pages/Shop.tsx
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCountry } from '../contexts/CountryContext';
import { useCart } from '../contexts/CartContext';
import {
  nigeriaProducts, canadaProducts,
  nigeriaCategories, canadaCategories,
  formatPrice, Product,
} from '@/data/shopData';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

// ─── HERO SLIDES ──────────────────────────────────────────────────────────────
const NIGERIA_SLIDES = [
  {
    image:    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80',
    tag:      'Construction Materials',
    headline: 'Build Nigeria\'s\nFuture Stronger',
    sub:      'Premium cement, steel rods and structural materials — delivered to your site.',
    cta:      'Shop Construction',
    category: 'Construction Materials',
    accent:   '#E02020',
  },
  {
    image:    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80',
    tag:      'Oil & Gas Supplies',
    headline: 'Industrial-Grade\nOil & Gas Equipment',
    sub:      'ANSI/ISO certified PPE, safety gear and field supplies for Nigerian operations.',
    cta:      'Shop Oil & Gas',
    category: 'Oil & Gas Supplies',
    accent:   '#E02020',
  },
  {
    image:    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80',
    tag:      'General Commerce',
    headline: 'Power Solutions\nFor Every Business',
    sub:      'Inverters, generators and solar systems — reliable power for Nigerian enterprises.',
    cta:      'Shop Power',
    category: 'General Commerce',
    accent:   '#E02020',
  },
  {
    image:    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80',
    tag:      'E-Commerce Goods',
    headline: 'Smart Retail\nTools & Equipment',
    sub:      'POS systems, barcode scanners and receipt printers for modern Nigerian businesses.',
    cta:      'Shop E-Commerce',
    category: 'E-Commerce Goods',
    accent:   '#E02020',
  },
];

const CANADA_SLIDES = [
  {
    image:    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80',
    tag:      'Mining Equipment',
    headline: 'Precision Tools\nFor Canadian Mining',
    sub:      'Diamond core bits, hydraulic splitters and GPR systems for demanding operations.',
    cta:      'Shop Mining',
    category: 'Mining Equipment',
    accent:   '#E02020',
  },
  {
    image:    'https://images.unsplash.com/photo-1504222490345-c075b626a261?w=1600&q=80',
    tag:      'Industrial Supplies',
    headline: 'Heavy-Duty\nIndustrial Equipment',
    sub:      'Air compressors, welding machines and industrial supplies for Canadian workshops.',
    cta:      'Shop Industrial',
    category: 'Industrial Supplies',
    accent:   '#E02020',
  },
  {
    image:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    tag:      'Construction Materials',
    headline: 'Certified Structural\nMaterials',
    sub:      'ASTM-certified steel beams, ICF forms and structural materials for Canadian builders.',
    cta:      'Shop Construction',
    category: 'Construction Materials',
    accent:   '#E02020',
  },
];

// ─── HERO SLIDER ──────────────────────────────────────────────────────────────
const HeroSlider = ({
  slides,
  onCategorySelect,
}: {
  slides: typeof NIGERIA_SLIDES;
  onCategorySelect: (cat: string) => void;
}) => {
  const [current, setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const go = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 400);
  }, [animating]);

  const next = useCallback(() => go((current + 1) % slides.length), [current, slides.length, go]);
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, slides.length, go]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(next, 5500);
    return () => clearTimeout(timerRef.current);
  }, [current, next]);

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden bg-gray-900" style={{ height: 'clamp(420px, 55vw, 660px)' }}>
      {/* Slides */}
      {slides.map((s, i) => (
        <div key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
          <img src={s.image} alt={s.tag}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.38)' }} />
        </div>
      ))}

      {/* Gradient */}
      <div className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />

      {/* Red left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E02020] z-20" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div
            className="max-w-2xl transition-all duration-500"
            style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(16px)' : 'translateY(0)' }}>

            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-[#E02020] px-3 py-1.5 mb-5">
              <span className="font-montserrat font-bold text-white text-xs uppercase tracking-widest">
                {slide.tag}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-montserrat font-extrabold text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', whiteSpace: 'pre-line' }}>
              {slide.headline}
            </h1>

            {/* Subtext */}
            <p className="font-poppins text-gray-300 mb-8 max-w-lg leading-relaxed"
              style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}>
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => onCategorySelect(slide.category)}
                className="inline-flex items-center gap-2 bg-[#E02020] text-white font-montserrat font-bold px-7 py-3.5 hover:bg-[#c01a1a] transition-all uppercase tracking-wide text-sm hover:gap-3">
                {slide.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => onCategorySelect('All')}
                className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-montserrat font-bold px-7 py-3.5 hover:border-white hover:bg-white/10 transition-all uppercase tracking-wide text-sm">
                View All Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/40 border border-white/20 text-white flex items-center justify-center hover:bg-[#E02020] hover:border-[#E02020] transition-all">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/40 border border-white/20 text-white flex items-center justify-center hover:bg-[#E02020] hover:border-[#E02020] transition-all">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className="transition-all duration-300"
            style={{
              width:  i === current ? '28px' : '8px',
              height: '8px',
              background: i === current ? '#E02020' : 'rgba(255,255,255,0.4)',
              borderRadius: '4px',
            }} />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 z-30">
        <span className="font-montserrat font-bold text-white text-sm">
          {String(current + 1).padStart(2, '0')}
          <span className="text-white/40"> / {String(slides.length).padStart(2, '0')}</span>
        </span>
      </div>
    </div>
  );
};

// ─── MARQUEE STRIP ────────────────────────────────────────────────────────────
const MarqueeStrip = ({ dark = false, items }: { dark?: boolean; items: string[] }) => {
  const text = items.join('   •   ');
  return (
    <div className={`${dark ? 'bg-gray-900 text-white' : 'bg-[#E02020] text-white'} py-2.5 overflow-hidden`}>
      <div className="flex whitespace-nowrap" style={{ animation: 'xpola-marquee 28s linear infinite' }}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="font-poppins text-xs tracking-wide mx-10 flex-shrink-0 opacity-90">{text}</span>
        ))}
      </div>
      <style>{`
        @keyframes xpola-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
};

// ─── CART DRAWER ──────────────────────────────────────────────────────────────
const CartDrawer = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useCart();
  const currency = cart[0]?.currency;

  return (
    <>
      {isCartOpen && <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-1 bg-[#E02020]" />
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="font-montserrat font-bold text-lg text-gray-900">Your Cart</h2>
            {cartCount > 0 && <span className="bg-[#E02020] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{cartCount}</span>}
          </div>
          <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                <svg className="w-9 h-9 text-[#E02020]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <div>
                <p className="font-montserrat font-bold text-gray-800">Cart is empty</p>
                <p className="font-poppins text-sm text-gray-400 mt-1">Browse and add items</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="bg-[#E02020] text-white font-montserrat font-bold px-6 py-2.5 text-sm uppercase tracking-wide hover:bg-[#c01a1a] transition-colors">Continue Shopping</button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 py-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover flex-shrink-0 rounded bg-gray-50"
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80'; }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-poppins font-semibold text-sm text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="font-poppins text-xs text-[#E02020] font-semibold mt-0.5">{item.category}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#E02020] hover:text-[#E02020] transition-colors font-bold rounded">−</button>
                      <span className="w-6 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#E02020] hover:text-[#E02020] transition-colors font-bold rounded">+</button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-[#E02020] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <p className="font-montserrat font-bold text-sm text-gray-900">{formatPrice(item.price * item.quantity, item.currency)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-1">
              <span className="font-poppins text-sm text-gray-500">Subtotal</span>
              <span className="font-montserrat font-extrabold text-xl text-gray-900">{currency && formatPrice(cartTotal, currency)}</span>
            </div>
            <p className="font-poppins text-xs text-gray-400 mb-4">Shipping calculated at checkout</p>
            <button onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
              className="w-full bg-[#E02020] text-white font-montserrat font-bold py-3.5 uppercase tracking-widest text-sm hover:bg-[#c01a1a] transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              Proceed to Checkout
            </button>
            <button onClick={() => setIsCartOpen(false)} className="w-full text-center font-poppins text-sm text-gray-400 hover:text-gray-700 mt-2.5 transition-colors">← Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
};

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, badge }: { product: Product; badge?: 'sale' | 'new' | 'featured' }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 900);
  };

  const badgeMap = { sale: { label: 'Sale', bg: 'bg-[#E02020]' }, new: { label: 'New', bg: 'bg-gray-900' }, featured: { label: 'Featured', bg: 'bg-amber-500' } };

  return (
    <Link to={`/shop/product/${product.id}`} className="group bg-white border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 flex flex-col relative">
      <div className="relative overflow-hidden bg-gray-50" style={{ paddingBottom: '68%' }}>
        <img src={product.image} alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80'; }} />
        {badge && <span className={`absolute top-3 left-3 ${badgeMap[badge].bg} text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider font-montserrat`}>{badgeMap[badge].label}</span>}
        {!product.inStock && <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-widest">Out of Stock</span></div>}
        <button onClick={e => { e.preventDefault(); setWishlist(v => !v); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
          <svg className={`w-4 h-4 transition-colors ${wishlist ? 'text-[#E02020] fill-[#E02020]' : 'text-gray-400'}`} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-bold text-[#E02020] uppercase tracking-widest font-poppins mb-1">{product.category}</p>
        <h3 className="font-montserrat font-bold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
          <span className="text-[10px] text-gray-400 font-poppins">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div>
            <p className="font-montserrat font-extrabold text-base text-gray-900">{formatPrice(product.price, product.currency)}</p>
            <p className={`text-[10px] font-semibold font-poppins mt-0.5 ${product.inStock ? 'text-green-600' : 'text-gray-400'}`}>{product.inStock ? '● In Stock' : '○ Out of Stock'}</p>
          </div>
          <button onClick={handleAdd} disabled={!product.inStock || adding}
            className={`font-montserrat font-bold text-[11px] px-3 py-2 uppercase tracking-wide transition-all duration-200 flex items-center gap-1.5 ${!product.inStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : adding ? 'bg-green-500 text-white' : 'bg-[#E02020] text-white hover:bg-[#c01a1a]'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            {adding ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </Link>
  );
};

// ─── CATEGORY IMAGES ─────────────────────────────────────────────────────────
const CAT_IMAGES: Record<string, string> = {
  'Oil & Gas Supplies':     'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80',
  'Construction Materials': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
  'General Commerce':       'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
  'E-Commerce Goods':       'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80',
  'Mining Equipment':       'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
  'Industrial Supplies':    'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80',
  'default':                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80',
};

const TRUST_BADGES = [
  { icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', title: 'Fast Delivery',      sub: 'Nationwide shipping'   },
  { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'Secure Payment', sub: 'Powered by Paystack'   },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Verified Products', sub: 'Quality guaranteed'   },
  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title: '24/7 Support',    sub: "We're always here"   },
];

// ─── MAIN SHOP ────────────────────────────────────────────────────────────────
const Shop = () => {
  const { currentData } = useCountry();
  const { cartCount, setIsCartOpen } = useCart();

  const isNigeria    = currentData.code === 'NG';
  const allProducts  = isNigeria ? nigeriaProducts  : canadaProducts;
  const allCats      = isNigeria ? nigeriaCategories : canadaCategories;
  const countryName  = isNigeria ? 'Nigeria' : 'Canada';
  const slides       = isNigeria ? NIGERIA_SLIDES : CANADA_SLIDES;
  const shopPath     = isNigeria ? '/nigeria/shop' : '/canada/shop';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery,       setSearchQuery]      = useState('');
  const [sortBy,            setSortBy]           = useState<SortOption>('featured');
  const [showInStock,       setShowInStock]      = useState(false);
  const [searchFocused,     setSearchFocused]    = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let r = [...allProducts];
    if (selectedCategory !== 'All') r = r.filter(p => p.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (showInStock) r = r.filter(p => p.inStock);
    r.sort((a, b) => {
      if (sortBy === 'featured')   return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating')     return b.rating - a.rating;
      return 0;
    });
    return r;
  }, [allProducts, selectedCategory, searchQuery, showInStock, sortBy]);

  const featured = allProducts.filter(p => p.featured);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchFocused(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const clearFilters = () => { setSelectedCategory('All'); setSearchQuery(''); setShowInStock(false); setSortBy('featured'); };
  const hasFilters   = selectedCategory !== 'All' || searchQuery.trim() !== '' || showInStock;

  // Scroll to products grid
  const scrollToProducts = () => {
    document.getElementById('all-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    scrollToProducts();
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <Navbar />
      <CartDrawer />

      {/* Announcement strip */}
      <div className="pt-[72px]">
        <MarqueeStrip items={[
          `🚚 Fast delivery across ${countryName}`,
          '✅ Verified industrial suppliers',
          '🔒 Paystack secure checkout',
          '📦 Bulk order discounts available',
          '📞 Dedicated support team',
        ]} />
      </div>

      {/* ── Sliding Hero ── */}
      <HeroSlider slides={slides} onCategorySelect={handleCategorySelect} />

      {/* ── Trust Badges ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
            {TRUST_BADGES.map(b => (
              <div key={b.title} className="flex items-center gap-3 px-6 py-5">
                <div className="w-10 h-10 bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#E02020]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={b.icon} /></svg>
                </div>
                <div>
                  <p className="font-montserrat font-bold text-gray-900 text-sm">{b.title}</p>
                  <p className="font-poppins text-xs text-gray-400">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="py-10 bg-white mt-2">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-montserrat font-extrabold text-2xl text-gray-900">Shop by Category</h2>
              <p className="font-poppins text-sm text-gray-500 mt-0.5">Explore our {countryName} catalogue</p>
            </div>
            <Link to={`${shopPath}/categories`} className="font-poppins text-sm text-[#E02020] font-semibold hover:underline flex items-center gap-1">
              All Categories
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allCats.filter(c => c !== 'All').map(cat => {
              const count = allProducts.filter(p => p.category === cat).length;
              return (
                <Link key={cat} to={`${shopPath}/categories`} onClick={() => setSelectedCategory(cat)}
                  className="group relative overflow-hidden block">
                  <div className="relative h-36 md:h-44 overflow-hidden">
                    <img src={CAT_IMAGES[cat] || CAT_IMAGES['default']} alt={cat}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={e => { (e.target as HTMLImageElement).src = CAT_IMAGES['default']; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/30 to-transparent" />
                    <div className="absolute inset-0 bg-[#E02020]/0 group-hover:bg-[#E02020]/15 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-montserrat font-bold text-white text-sm leading-tight">{cat}</p>
                      <p className="font-poppins text-white/70 text-xs mt-0.5">{count} products</p>
                      <span className="inline-flex items-center gap-1 font-poppins text-xs text-[#E02020] font-bold mt-1.5 bg-white/90 px-2 py-0.5">
                        Shop Now →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-10 bg-[#f8f8f8]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-montserrat font-extrabold text-2xl text-gray-900">Featured Products</h2>
              <p className="font-poppins text-sm text-gray-500 mt-0.5">Handpicked for {countryName}</p>
            </div>
            <button onClick={scrollToProducts} className="font-poppins text-sm text-[#E02020] font-semibold hover:underline flex items-center gap-1">
              View All <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} badge={i === 0 ? 'featured' : i === 1 ? 'sale' : 'new'} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Red promo marquee ── */}
      <MarqueeStrip items={['⚡ Bulk Orders Welcome', 'Request a Quote', `Quality Guaranteed`, `Fast ${countryName} Delivery`, '🔒 Paystack Secure']} />

      {/* ── All Products ── */}
      <section id="all-products" className="py-10 bg-white">
        <div className="container mx-auto px-4">
          {/* Filter bar */}
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between mb-6 p-4 bg-gray-50 border border-gray-100">
            {/* Search */}
            <div ref={searchRef} className="relative w-full md:w-72">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Search products..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 text-sm font-poppins focus:outline-none focus:border-[#E02020] transition-colors bg-white" />
              {/* Suggestions */}
              {searchFocused && searchQuery.length > 1 && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-xl z-20 border border-gray-100 max-h-48 overflow-y-auto">
                  {allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5).map(p => (
                    <Link key={p.id} to={`/shop/product/${p.id}`} onClick={() => setSearchFocused(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors">
                      <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded"
                        onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80'; }} />
                      <div className="flex-1 min-w-0">
                        <p className="font-poppins text-sm text-gray-900 font-semibold truncate">{p.name}</p>
                        <p className="font-poppins text-xs text-[#E02020]">{p.category}</p>
                      </div>
                      <p className="font-montserrat font-bold text-sm text-gray-900 flex-shrink-0">{formatPrice(p.price, p.currency)}</p>
                    </Link>
                  ))}
                  {allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-400 font-poppins">No results for "{searchQuery}"</div>
                  )}
                </div>
              )}
            </div>

            {/* Category chips + controls */}
            <div className="flex items-center gap-2 flex-wrap">
              {allCats.slice(0, 4).map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold font-poppins transition-all border ${selectedCategory === cat ? 'bg-[#E02020] text-white border-[#E02020]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#E02020] hover:text-[#E02020]'}`}>
                  {cat}
                </button>
              ))}
              <label className="flex items-center gap-1.5 text-xs text-gray-600 font-poppins cursor-pointer">
                <input type="checkbox" checked={showInStock} onChange={e => setShowInStock(e.target.checked)} className="accent-[#E02020] w-3.5 h-3.5" />
                In Stock
              </label>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="font-poppins text-xs text-gray-400">{filtered.length} products</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}
                className="py-1.5 px-3 border border-gray-200 text-xs font-poppins focus:outline-none focus:border-[#E02020] bg-white">
                <option value="featured">Featured</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="rating">Top Rated</option>
              </select>
              {hasFilters && <button onClick={clearFilters} className="text-xs text-[#E02020] font-semibold font-poppins hover:underline">Clear</button>}
            </div>
          </div>

          <h2 className="font-montserrat font-extrabold text-2xl text-gray-900 mb-5">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h2>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 border border-gray-100">
              <p className="font-montserrat font-bold text-gray-800 text-lg">No products found</p>
              <button onClick={clearFilters} className="mt-4 bg-[#E02020] text-white font-montserrat font-bold px-5 py-2.5 text-sm uppercase tracking-wide hover:bg-[#c01a1a] transition-colors">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p}
                  badge={p.featured ? 'featured' : i % 7 === 0 ? 'sale' : i % 11 === 0 ? 'new' : undefined} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart FAB */}
      <button onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-[#E02020] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#c01a1a] transition-all hover:scale-110">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
        )}
      </button>

      <Footer />
    </div>
  );
};

export default Shop;
