import BestSeller from "../components/BestSeller";
import FeatureCategories from "../components/FeatureCategories";
import HeroSection from "../components/HeroSection";
import NewArrival from "../components/NewArrival";
import Title from '../components/Title';

const Home = () => {
  return (
    <main>
      <HeroSection/>
      <Title title="Featured categories"/>
      <FeatureCategories/>
      <Title title="Top Products"/>
      <BestSeller/>
      <Title title="New Arrival"/>
      <NewArrival/>
    </main>
  )
}

export default Home
