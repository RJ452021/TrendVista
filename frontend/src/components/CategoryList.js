import React from 'react';
 // Importing specific CSS for CategoryList

function CategoryList({ categories, setSelectedCategory }) {
  return (
    <div className=" h-screen p-10 border-r border-gray-500 w-1/4 ">
      <h3 className="text-2xl font-semibold mb-4">Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id} onClick={() => setSelectedCategory(category._id)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;