import { useState } from 'react';

function Search() {
  const [filter, setFilter] = useState({
    location: '',
    price: '',
    category: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle filter submission here (e.g., fetch data from API)
    console.log('Filters:', filter);
  };

  return (
    <div className="grid justify-center bg-amber-800 text-white">
      <h1 className='text-center'>Hire all types of Equipments</h1>
      <form className='flex' onSubmit={handleSubmit}>
      <button type="submit">Filter By:</button>
        <div className="">
          <select id="location" name="location" value={filter.location} onChange={handleFilterChange}>
            <option value="">Location</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            {/* Add more location options */}
          </select>
        </div>
        <div className="">
          <select id="price" name="price" value={filter.price} onChange={handleFilterChange}>
            <option value="">Price</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="">
          <select id="category" name="category" value={filter.category} onChange={handleFilterChange}>
            <option value="">Categories</option>
            <option value="construction">Construction</option>
            <option value="agriculture">Agriculture</option>
            {/* Add more category options */}
          </select>
        </div>
      </form>
    </div>
  );
}

export default Search;