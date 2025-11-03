import HeroSlider from "../Components/HeroSlider";
import FeaturedCategories from "../Components/FeaturedCategories";
import { userId } from "../utils/constants";
import PromotionModal from "../Components/PromotionModal";
import ProductBannerOne from "../Components/ProductBannerOne";
import PopularProducts from "../Components/PopularProducts";
import PixelShowcase from "../Components/PixelShowcase";
import Camaras from "../Components/Camaras";
import WhyBuySection from "../Components/WhyBuySection";
import NewArrival from "../Components/NewArrival";
import Blogs from "./blogs/page";




export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/get-sliders/${userId}`,
    { cache: "no-cache" }
  );
  const slider = await res.json();

  const bannerRes = await fetch(
    `${process.env.NEXT_PUBLIC_API}/get-banners/${userId}`,
    {
      cache: "no-cache",
    }
  );
  const banner = await bannerRes.json();

  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,
    {
      cache: "no-cache",
    }
  );
  const categories = await categoriesRes.json();


  const brandsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API}/public/brands/${userId}`,
    {
      cache: "no-cache",
    }
  );
  const brands = await brandsRes.json();

  return (
    <>
      <PromotionModal />
      <HeroSlider slider={slider} banner={banner} />
      {/* <OurFeatures /> */}
      <NewArrival></NewArrival>
      <ProductBannerOne banner={banner?.data}></ProductBannerOne>
      <PopularProducts />
      <PixelShowcase></PixelShowcase>
      <FeaturedCategories categories={categories} />

      {/* <Camaras></Camaras> */}

      <Blogs></Blogs>

      <WhyBuySection></WhyBuySection>

      {/* <NewArrival banner={banner} />
      <BestDeals />
      <BannerSection banner={banner} />
      <BestSelling></BestSelling>
      <BannerSection2 banner={banner}></BannerSection2>
      <TopBrandProducts brands={brands} />
      <Brands brands={brands} /> */}
    </>
  );
}
