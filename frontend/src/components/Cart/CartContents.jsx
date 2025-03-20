import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Blue",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Blue",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=2",
    },
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Blue",
      quantity: 1,
      price: 65,
      image: "https://picsum.photos/200?random=3",
    },
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Blue",
      quantity: 1,
      price: 55,
      image: "https://picsum.photos/200?random=4",
    },
  ];

  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-28 object-cover"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">Size: {product.size}</p>
              <p className="text-sm text-gray-600">Color: {product.color}</p>
              <p className="text-sm text-gray-600">
                Quantity: {product.quantity}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  -
                </button>
                <span className="mx-4">1</span>
                <button className="border rounded px-2 py-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>
            <div>
              <p>${product.price.toLocaleString()}</p>
              <button>
                <RiDeleteBin3Line className="h-4 w-4 mt-2 text-red-600"/>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
