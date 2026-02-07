import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhySection from "@/components/WhySection";
import DropCountdown from "@/components/DropCountdown";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <WhySection />
      <DropCountdown />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
