import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function GuestView({ establishment }) {
  const [activeCategory, setActiveCategory] = useState(establishment.categories?.[0]?.id || null);

  if (!establishment.categories || establishment.categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">No menu categories available.</p>
      </div>
    );
  }

  return (
    <>
      <Head title={establishment.name} />
      <div className={`min-h-screen ${establishment.color_theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <header className="bg-opacity-90 backdrop-filter backdrop-blur-lg fixed top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              {establishment.logo && (
                <img src={establishment.logo || "/placeholder.svg"} alt={establishment.name} className="h-10 w-10 rounded-full mr-3" />
              )}
              <h1 className="text-2xl font-bold">{establishment.name}</h1>
            </div>
            {establishment.can_make_orders && (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Place Order
              </button>
            )}
          </div>
        </header>

        {establishment.categories.length > 0 && (
          <nav className="bg-opacity-75 backdrop-filter backdrop-blur-md sticky top-16 z-10 overflow-x-auto whitespace-nowrap">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              {establishment.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium mr-2 ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </nav>
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
          {establishment.categories.map((category) => (
            <div key={category.id} className={activeCategory === category.id ? '' : 'hidden'}>
              <h2 className="text-3xl font-bold mb-6">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product) => (
                  <div key={product.id} className={`bg-white rounded-lg shadow-md overflow-hidden ${establishment.color_theme === 'dark' ? 'bg-gray-800' : ''}`}>
                    {product.image && (
                      <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">{establishment.currency} {product.price}</span>
                        {establishment.can_make_orders && (
                          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            Add to Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                <p>{establishment.address}</p>
                <p>{establishment.phone}</p>
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                {establishment.wifi_pass && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Wi-Fi Password</h3>
                    <p>{establishment.wifi_pass}</p>
                  </div>
                )}
                {establishment.google_maps_link && (
                  <a
                    href={establishment.google_maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View on Google Maps
                  </a>
                )}
              </div>
              <div className="w-full md:w-1/3">
                <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  {establishment.facebook && (
                    <a href={establishment.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  )}
                  {establishment.instagram && (
                    <a href={establishment.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400">
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {establishment.twitter && (
                    <a href={establishment.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {establishment.tiktok && (
                    <a href={establishment.tiktok} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300">
                      <i className="fab fa-tiktok"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

