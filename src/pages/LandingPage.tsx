import HeroSection from '../components/landing/HeroSection'
import ShopTheLook from '../components/landing/ShopTheLook'
import Product360 from '../components/landing/Product360'
import AtelierGallery from '../components/landing/AtelierGallery'
import FeaturesStrip from '../components/landing/FeaturesStrip'
import TrendingProducts from '../components/landing/TrendingProducts'
import WhyChooseUs from '../components/landing/WhyChooseUs'
import BrandMarquee from '../components/landing/BrandMarquee'
import Testimonial from '../components/landing/Testimonial'
import Footer from '../components/common/Footer'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ShopTheLook />
      <Product360 />
      <AtelierGallery />
      <FeaturesStrip />
      <TrendingProducts />
      <WhyChooseUs />
      <BrandMarquee />
      <Testimonial />
      <Footer />
    </>
  )
}
