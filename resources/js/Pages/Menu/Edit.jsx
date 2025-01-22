import React, { useState } from "react"
import { router } from "@inertiajs/react"
import Layout from "@/Layouts/Layout"

export default function Edit({ menu }) {
  const [categories, setCategories] = useState(menu.categories)

  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = [...categories]
    updatedCategories[index][field] = value
    setCategories(updatedCategories)
  }

  const handleProductChange = (categoryIndex, productIndex, field, value) => {
    const updatedCategories = [...categories]
    updatedCategories[categoryIndex].products[productIndex][field] = value
    setCategories(updatedCategories)
  }

  const addCategory = () => {
    setCategories([...categories, { name: "", products: [] }])
  }

  const addProduct = (categoryIndex) => {
    const updatedCategories = [...categories]
    updatedCategories[categoryIndex].products.push({
      name: "",
      description: "",
      price: "",
      status: true,
    })
    setCategories(updatedCategories)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    router.put(route("menu.update", menu.id), { categories })
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Edit Menu</h1>
      <form onSubmit={handleSubmit}>
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8 bg-white shadow-md rounded-lg p-6">
            <input
              type="text"
              value={category.name}
              onChange={(e) => handleCategoryChange(categoryIndex, "name", e.target.value)}
              className="text-2xl font-bold mb-4 w-full"
              placeholder="Category Name"
            />
            {category.products.map((product, productIndex) => (
              <div key={productIndex} className="mb-4 border-b pb-4">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleProductChange(categoryIndex, productIndex, "name", e.target.value)}
                  className="text-xl font-semibold mb-2 w-full"
                  placeholder="Product Name"
                />
                <textarea
                  value={product.description}
                  onChange={(e) => handleProductChange(categoryIndex, productIndex, "description", e.target.value)}
                  className="w-full mb-2"
                  placeholder="Product Description"
                />
                <div className="flex items-center">
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleProductChange(categoryIndex, productIndex, "price", e.target.value)}
                    className="w-24 mr-4"
                    placeholder="Price"
                  />
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={product.status}
                      onChange={(e) => handleProductChange(categoryIndex, productIndex, "status", e.target.checked)}
                      className="mr-2"
                    />
                    Active
                  </label>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addProduct(categoryIndex)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Product
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addCategory}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add Category
        </button>
        <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
          Save Menu
        </button>
      </form>
    </Layout>
  )
}

