const ProductCard = ({ items }) => {
  console.log(items);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
        >
          <img src="" alt="Equipment" className="w-full h-48 object-cover" />
          <div className="p-4">
            <p className="text-yellow-500 font-bold text-lg">
              ₦{item.price}{" "}
              <span className="text-sm text-gray-500">/ per day</span>
            </p>
            <h2 className="font-semibold text-gray-800 text-lg mt-2">
              {item.title}
            </h2>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            <p className="text-green-500 text-sm font-medium mt-2">
              {item.availability}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
