import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
  const [filter, setFilter] = useState({
    location: "",
    price: "",
    category: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle filter submission here (e.g., fetch data from API)
    console.log("Filters:", filter);
  };

  return (
    <div className="grid justify-center bg-amber-800 text-white">
      <h1 className="mb-4 mt-12 text-xl font-bold text-center">Hire all types of Equipments</h1>
      <div className="hidden md:flex lg:flex items-center bg-white rounded-lg px-4 py-3 w-full max-w-md mb-4 mx-auto shadow-md">
        <input
          type="text"
          placeholder="Search Equipments"
          className="bg-transparent outline-none flex-grow text-sm text-black"
        />
        <FaSearch className="text-black mr-2" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-4">
          <div className="text-black text-sm bg-white px-2 py-1 rounded-lg">
            <button type="submit">Filter By:</button>
          </div>
          <div className="flex items-center text-black text-sm bg-white px-2 py-1 rounded-lg">
            <div className="">
              <select
                id="location"
                name="location"
                value={filter.location}
                onChange={handleFilterChange}
              >
                <option value="">Location</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                {/* Add more location options */}
              </select>
            </div>
            <div className="">
              <select
                id="price"
                name="price"
                value={filter.price}
                onChange={handleFilterChange}
              >
                <option value="">Price</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="">
              <select
                id="category"
                name="category"
                value={filter.category}
                onChange={handleFilterChange}
              >
                <option value="">Categories</option>
                <option value="construction">Construction</option>
                <option value="agriculture">Agriculture</option>
                {/* Add more category options */}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
