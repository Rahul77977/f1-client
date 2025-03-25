import Layout from '../components/Layouts/Layout.jsx';
import Carousel from '../components/Carousel.jsx';
import HomeProduct from './HomeProduct.jsx';
import PromotionalSlider from './PromotionalSlider.jsx';
import HomeCate from './HomeCate.jsx';
import OfferTicker from './OfferTicker.jsx'; // Adjust the path as needed
import "./home.css";

const Home = () => {
  return (
    <Layout title={"Homepage"}>
      <div className="home-container">
        <OfferTicker />

        {/* Categories Section */}
        <h2 className="text-center"></h2>
        <HomeCate />

        {/* Carousel */}
        <Carousel className="" />

        {/* Featured Products Section */}
        <section className="featured-products">
          <HomeProduct />
        </section>

        {/* <section className="promotional-section">
          <PromotionalSlider />
        </section> */}
        
      </div>
    </Layout>
  );
};

export default Home;
