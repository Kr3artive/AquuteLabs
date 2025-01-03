import { useContext } from "react";
import Logo from "../images/Logo.png";
import DP from "../images/DP.png";
import { MdOutlineQueue } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { SmallScreenContext } from "../contexts/SmallScreenContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { nav, handleSmall } = useContext(SmallScreenContext);

  return (
    <header className="flex justify-between items-center px-14 py-4 bg-amber-500 relative">
      {/* Small Screen Menu */}
      <div className="flex lg:hidden">
        {!nav ? (
          <GiHamburgerMenu size={25} onClick={handleSmall} />
        ) : (
          <MdClose size={25} onClick={handleSmall} />
        )}
      </div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 shadow-lg transform ${
          nav ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden z-50`}
      >
        <div className="flex flex-col gap-6 p-6">
          <MdClose className="" size={25} onClick={handleSmall} />
          <div className="bg-amber-400 text-white py-3 px-6 rounded-full">
            <h1 className="text-sm text-center font-bold">Complete Profile</h1>
          </div>
          <div className="bg-amber-400 flex justify-center text-white p-2 rounded-full">
            <MdOutlineQueue size={30} />
          </div>
          <div className="flex items-center bg-amber-600 rounded-lg px-4 py-3 w-full max-w-md mb-4 mx-auto shadow-md">
            <input
              type="text"
              placeholder="Search Equipments"
              className="bg-transparent outline-none flex-grow text-sm text-white"
            />
            <FaSearch size={30} />
          </div>
        </div>
      </div>

      {/* Main Logo Section */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="equipment" />
        <h1 className="font-bold text-lg">Equipment.ng</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <div className="bg-amber-400 text-white py-3 px-6 rounded-full">
            <h1 className="text-sm font-bold">Complete Profile</h1>
          </div>
          <div className="bg-amber-400 text-white p-2 rounded-full">
            <MdOutlineQueue size={30} />
          </div>
        </div>
        <Link to={"/login"}>
          <img src={DP} alt="User" className="w-10 h-10 md:w-14 md:h-14 rounded-full" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
