import React from 'react';
 // Importing specific CSS for ProductList

function ProductList({ products }) {
  return (
    <div className="product-list overflow-y-auto h-screen p-10 w-3/4 bg-gray-100 ">
      <h3 className='text-3xl font-bold mb-6 text-gray-800'>Explore Our Products</h3>
      {products.length === 0 ? (
        <p className="text-lg text-gray-600">Select a category to view products</p>
      ) : (
        <ul className="product-list-items grid grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product._id} className="product-item bg-white rounded-lg shadow-md p-4">
              <img src={product.imageUrl} alt={product.name} className="product-image w-full h-48 object-cover rounded-t-lg" />
              <div className="product-info mt-4">
                <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;