import React from "react";

const EquipmentListing = () => {
  const items = Array(10).fill({
    price: "2,500,000.00",
    title: "Steel Pipelines Cables",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,",
    availability: "Available: Immediately",
  });

  return (
    <div>
      <div
        className="mx-auto mb-8 p-20 rounded-xl bg-cover bg-center"
        style={{
          backgroundImage: ` url('https://s3-alpha-sig.figma.com/img/53c4/9d04/32ebb4afea0e493dd8a7a2e7f53506c6?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZEQ4sVy3gTmVYssWTLhReHu5bqIyiWJ81Pri18SShu2j1~FucsY5lTYp9NKKPQkTGf4eMZNJBhRTh4HvaDuoWTBK1Cqg1ZNZ8HJ45K0h1tUHuSO7cqlwHRuNxozw~1HUJHCxGCIs7X~Aey4l4kL4NuV9UCWJA6St9R052S4KIWbEVyLOub51s~0nvzJx32~qITaj991uFA5WDI1dYOcGGxcM1SURL90QU4FaSlf~okjEtZ2VOmlO9hfRBjI~a0h1XFV3XCHz5hEqEyQ7cfPcQZoWqE3LwBUIzLi0zx~Aw89wVNUgQqeU4ptQ~xJNlifJUpwXn2PYWfPczzJQrBhkHQ')`,
        }}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-black">
          List Your Item on Equipment.ng
        </h1>
        <p className="text-black max-w-xl mt-2">
          Easy to follow steps to list a wide range of construction,
          agricultural, and industrial equipment. Rent from verified lessors
          with ease.
        </p>
        <button className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition">
          Check it out
        </button>
      </div>
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src="https://s3-alpha-sig.figma.com/img/3fe0/b33e/4c9728b2ee4e893a0756ec38505d8f46?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RmDzbyBJQDFu3SuQodxhaCqWQJ-LbAmyoPeom8vpMpXodDPmvZw1pvfGO2q4kj3VIBtHuqMi~wCG7vuH7dcgBcjE6EupvD9JuAUn961zw4rsqzxUUi1pKZZuKWqfyzaWC6MYhrms0ujTYUF8RRaRHAAubpAqc8g6bVNWmTasV4vTvGeKPoFcJ90SMYaqmt8-T3gey7kHte1cylb6YSOTezLhFaVK-HHpAuCk8VtI0o6uv-B7cMwfqeH0-LoZFVjEproWbwCldie4gfZ5VHNrjgcoLgmXMzNdbCgu-NWWYLMUfdyr-i8SV75aaewnLY1Ep01cI4Tdu16L9rcfKqa8cQ__"
              alt="Equipment"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex gap-1 items-center justify-between">
                <p className="text-amber-600 font-bold text-lg">
                  ₦{item.price}{" "}
                </p>
                <h1 className="text-xs text-black">/ per day</h1>
              </div>
              <h2 className="font-semibold text-black text-lg">
                {item.title}
              </h2>
              <p className="text-black text-xs mt-1">{item.description}</p>
              <p className="text-gray-500 text-xs font-medium mt-2">
                {item.availability}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentListing;
