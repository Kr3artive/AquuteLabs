import EquipmentListing from "../components/EquimentListing";
import Header from "../components/Header";
import Search from "../components/Search";

const Home = () => {

  return (
    <div>
      <Header />
      <Search />
      <div className="py-8 px-4 sm:px-6 lg:px-24">
        <EquipmentListing />
      </div>
    </div>
  );
};

export default Home;
