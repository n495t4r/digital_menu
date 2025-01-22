import React, { useState } from "react"
import { Head } from "@inertiajs/react"
import { ShoppingCart, MapPin, Phone, Wifi, Facebook, Instagram, Twitter, TwitterIcon as TikTok } from "lucide-react"

export default function GuestView({ establishment }) {
  const [activeCategory, setActiveCategory] = useState(establishment.categories?.[0]?.id || null)

  const getContrastColor = (hexColor) => {
    // Convert hex to RGB
    const r = Number.parseInt(hexColor.slice(1, 3), 16)
    const g = Number.parseInt(hexColor.slice(3, 5), 16)
    const b = Number.parseInt(hexColor.slice(5, 7), 16)

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    // Return black for light backgrounds, white for dark
    return luminance > 0.5 ? "#000000" : "#FFFFFF"
  }

  const textColor = getContrastColor(establishment.color)
  const bgColor = establishment.color

  if (!establishment.categories || establishment.categories.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        <p className="text-xl">No menu categories available.</p>
      </div>
    )
  }

  return (
    <>
      <Head title={establishment.name} />
      <div className="min-h-screen" style={{ backgroundColor: "white", color: textColor }}>
        <header
          className="bg-opacity-90 backdrop-filter backdrop-blur-lg relative h-64 flex items-end"
          style={{
            backgroundImage: `url(${establishment.bg_image || "/placeholder.svg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-end">
            <div className="flex items-center">
              {establishment.logo && (
                <img
                  src={establishment.logo || "/placeholder.svg"}
                  alt={establishment.name}
                  className="h-16 w-16 rounded-full mr-4 border-2 border-white"
                />
              )}
              <h1 className="text-4xl font-bold text-white">{establishment.name}</h1>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
          {" "}
          {/* Update 3 */}
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 mb-6 mb-6 text-sm text-gray-600">
          <p className="text-gray-600 mb-2">
              {establishment.description || "Welcome to our establishment. Enjoy your visit!"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {" "}
              {/* Update 1 */}
              <div className="flex items-center">
                <MapPin className="mr-2" size={18} style={{ color: bgColor }} /> {/* Update 2 */}
                <p>{establishment.address}</p>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2" size={15} style={{ color: bgColor }} /> {/* Update 2 */}
                <p>{establishment.phone}</p>
              </div>
              {establishment.wifi_pass && (
                <div className="flex items-center">
                  <Wifi className="mr-2" size={15} style={{ color: bgColor }} /> {/* Update 2 */}
                  <p>Wi-Fi: {establishment.wifi_pass}</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between items-center">
              {establishment.google_maps_link && (
                <a
                  href={establishment.google_maps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:underline"
                  style={{ color: bgColor }}
                >
                  View on Google Maps
                </a>
              )}
              <div className="flex space-x-4">
                {establishment.facebook && (
                  <a href={establishment.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook size={20} style={{ color: bgColor }} />
                  </a>
                )}
                {establishment.instagram && (
                  <a href={establishment.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram size={20} style={{ color: bgColor }} />
                  </a>
                )}
                {establishment.twitter && (
                  <a href={establishment.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter size={20} style={{ color: bgColor }} />
                  </a>
                )}
                {establishment.tiktok && (
                  <a href={establishment.tiktok} target="_blank" rel="noopener noreferrer">
                    <TikTok size={20} style={{ color: bgColor }} />
                  </a>
                )}
              </div>
            </div>
          </div>
          {establishment.categories.length > 0 && (
            <nav className="mb-8 overflow-x-auto">
              <div className="flex space-x-2">
                {establishment.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out ${
                      activeCategory === category.id
                        ? "bg-white text-black"
                        : "bg-black bg-opacity-10 text-white hover:bg-opacity-20"
                    }`}
                    style={{
                      backgroundColor: activeCategory === category.id ? "white" : "rgba(0,0,0,0.4)",
                      color: activeCategory === category.id ? bgColor : "white",
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </nav>
          )}
          <main>
            {establishment.categories.map((category) => (
              <div key={category.id} className={activeCategory === category.id ? "" : "hidden"}>
                <h2 className="text-3xl font-semibold mb-4 text-gray-600">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.products.map((product) => (
                    <div key={product.id} className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden">
                      {product.image && (
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2" style={{ color: bgColor }}>
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-1">{product.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold" style={{ color: bgColor }}>
                            {establishment.currency}{" "}
                            {Number(product.price).toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}{" "}
                            {/* Update 4 */}
                          </span>
                          {establishment.can_make_orders && (
                            <button
                              className="p-2 rounded-full transition-colors duration-200 ease-in-out hover:bg-opacity-80"
                              style={{ backgroundColor: bgColor, color: textColor }}
                            >
                              <ShoppingCart size={20} />
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
        </div>

        <footer className="bg-black bg-opacity-90 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm">
              &copy; {new Date().getFullYear()} {establishment.name}. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

