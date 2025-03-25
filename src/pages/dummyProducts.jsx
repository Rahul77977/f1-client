// ProductGrid.jsx
import './demo.css';

const dummyProducts = [
  {
    id: 1,
    name: "Krups Evidence ECOdesign EA897B",
    image: "https://example.com/coffee-machine.jpg",
    rating: 4,
    reviewCount: 3,
    price: 420.00,
    originalPrice: 469.00,
    discount: 11,
    shipping: "Today Shipping",
    stock: "In Stock"
  },
  {
    id: 2,
    name: "Philips PerfectCare Elite Plus GC9682/80 Steam Generator",
    image: "https://example.com/steam-iron.jpg",
    rating: 4,
    reviewCount: 3,
    price: 400.00,
    originalPrice: 465.78,
    discount: 15,
    shipping: "Shipping within 3 days",
    stock: "In Stock"
  },
  {
    id: 3,
    name: "Keurig K-Duo Essentials Carafe Coffee Maker – Black",
    image: "https://example.com/coffee-maker.jpg",
    rating: 4,
    reviewCount: 3,
    price: 150.00,
    originalPrice: 157.00,
    discount: 5,
    shipping: "Today Shipping",
    stock: "In Stock"
  },
  {
    id: 4,
    name: "iRobot Roomba E6 (6199) Robot Vacuum",
    image: "https://example.com/robot-vacuum.jpg",
    rating: 4,
    reviewCount: 3,
    price: 349.99,
    shipping: "Today Shipping",
    stock: "In Stock"
  },
  {
    id: 5,
    name: "GORENJE Waschmaschine WHP74EPS Waschmaschine",
    image: "https://example.com/washing-machine.jpg",
    rating: 4,
    reviewCount: 3,
    price: 549.00,
    originalPrice: 699.00,
    discount: 22,
    shipping: "Shipping within 3 days",
    stock: "In Stock"
  }
];

const ProductCard = ({ product }) => (
  <div className="product-card">
    <div className="product-image">
      <img src={product.image} alt={product.name} />
      {product.discount && <span className="discount">{product.discount}%</span>}
      <button className="favorite">❤</button>
    </div>
    <h3>{product.name}</h3>
    <div className="rating">
      {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
      <span>{product.reviewCount}</span>
    </div>
    <div className="price">
      <span className="current-price">${product.price.toFixed(2)}</span>
      {product.originalPrice && (
        <span className="original-price">${product.originalPrice.toFixed(2)}</span>
      )}
    </div>
    <div className="shipping">{product.shipping}</div>
    <div className="stock">{product.stock}</div>
    <button className="add-to-cart">🛒 Add to Cart</button>
  </div>
);

const ProductGrid = () => (
  <div className="product-grid">
    {dummyProducts.mhoe((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductGrid;

