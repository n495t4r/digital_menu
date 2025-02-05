import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import Checkbox from "@/Components/Checkbox";
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react";

export default function Edit({ menu }) {
  const [categories, setCategories] = useState(menu.categories);

  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };

  const handleProductChange = (categoryIndex, productIndex, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].products[productIndex][field] = value;
    setCategories(updatedCategories);
  };

  const addCategory = () => {
    setCategories([...categories, { name: "", products: [] }]);
  };

  const removeCategory = (categoryIndex) => {
    const updatedCategories = categories.filter((_, index) => index !== categoryIndex);
    setCategories(updatedCategories);
  };

  const addProduct = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].products.push({
      name: "",
      description: "",
      price: "",
      status: true,
    });
    setCategories(updatedCategories);
  };

  const removeProduct = (categoryIndex, productIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].products.splice(productIndex, 1);
    setCategories(updatedCategories);
  };

  const moveCategory = (index, direction) => {
    if ((direction === -1 && index > 0) || (direction === 1 && index < categories.length - 1)) {
      const updatedCategories = [...categories];
      const temp = updatedCategories[index];
      updatedCategories[index] = updatedCategories[index + direction];
      updatedCategories[index + direction] = temp;
      setCategories(updatedCategories);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.put(route("menu.update", menu.id), { categories });
  };

  return (
    <AuthenticatedLayout
    header="Menu"
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-8">Edit Menu</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center space-x-2">                    <label className="flex items-center">
                    <Checkbox
                      checked={category.status}
                      onChange={(e) => handleProductChange(categoryIndex, "status", e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-600">Active</span>
                  </label>

                    <button
                      type="button"
                      onClick={() => moveCategory(categoryIndex, -1)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <MoveUp className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveCategory(categoryIndex, 1)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <MoveDown className="w-5 h-5" />
                    </button>
                    <DangerButton
                      onClick={() => removeCategory(categoryIndex)}
                      className="!p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </DangerButton>
                  </div>
                  <div className="flex items-center justify-between mb-6">

                    <div className="flex-1 mr-4">
                      <InputLabel htmlFor={`category-${categoryIndex}`} value="Category Name" />
                      <TextInput
                        id={`category-${categoryIndex}`}
                        type="text"
                        value={category.name}
                        onChange={(e) => handleCategoryChange(categoryIndex, "name", e.target.value)}
                        className="mt-1 block w-full"
                        placeholder="Enter category name"
                      />
                    </div>



                  </div>


                  <div className="space-y-4">
                    {category.products.map((product, productIndex) => (
                      <div key={productIndex} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <InputLabel htmlFor={`product-${categoryIndex}-${productIndex}`} value="Product Name" />
                            <TextInput
                              id={`product-${categoryIndex}-${productIndex}`}
                              type="text"
                              value={product.name}
                              onChange={(e) => handleProductChange(categoryIndex, productIndex, "name", e.target.value)}
                              className="mt-1 block w-full"
                              placeholder="Enter product name"
                            />
                          </div>

                          <div>
                            <InputLabel htmlFor={`price-${categoryIndex}-${productIndex}`} value="Price" />
                            <TextInput
                              id={`price-${categoryIndex}-${productIndex}`}
                              type="number"
                              step="0.01"
                              value={product.price}
                              onChange={(e) => handleProductChange(categoryIndex, productIndex, "price", e.target.value)}
                              className="mt-1 block w-full"
                              placeholder="0.00"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <InputLabel htmlFor={`description-${categoryIndex}-${productIndex}`} value="Description" />
                          <textarea
                            id={`description-${categoryIndex}-${productIndex}`}
                            value={product.description}
                            onChange={(e) => handleProductChange(categoryIndex, productIndex, "description", e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            rows="3"
                            placeholder="Enter product description"
                          />
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <label className="flex items-center">
                            <Checkbox
                              checked={product.status}
                              onChange={(e) => handleProductChange(categoryIndex, productIndex, "status", e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">Active</span>
                          </label>

                          <DangerButton
                            onClick={() => removeProduct(categoryIndex, productIndex)}
                            className="!p-2"
                          >
                            <Trash2 className="w-5 h-5" />
                          </DangerButton>
                        </div>
                      </div>
                    ))}
                  </div>

                  <SecondaryButton
                    onClick={() => addProduct(categoryIndex)}
                    className="mt-4"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Product
                  </SecondaryButton>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <SecondaryButton onClick={addCategory} type="button">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Category
                </SecondaryButton>

                <PrimaryButton type="submit">
                  Save Menu
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}