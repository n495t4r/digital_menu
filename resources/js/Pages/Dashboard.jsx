import React from "react"
import { Link, Head } from "@inertiajs/react"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"

export default function Dashboard({ auth, establishments }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h1 className="text-3xl font-bold mb-6">Your Establishments</h1>
              {establishments.length === 0 ? (
                <div className="text-center">
                  <p className="mb-4">You haven't created any establishments yet.</p>
                  <Link
                    href={route("establishments.create")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Create Your First Establishment
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {establishments.map((establishment) => (
                    <div key={establishment.id} className="bg-white shadow-md rounded-lg p-6">
                      <h2 className="text-xl font-semibold mb-2">{establishment.name}</h2>
                      <p className="text-gray-600 mb-4">{establishment.address}</p>
                      <div className="flex justify-between">
                        <Link
                          href={route("establishments.show", establishment.id)}
                          className="text-blue-500 hover:underline"
                        >
                          View Details
                        </Link>
                        <Link href={route("menu.edit", establishment.id)} className="text-green-500 hover:underline">
                          Edit Menu
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {establishments.length > 0 && (
                <div className="mt-8">
                  <Link
                    href={route("establishments.create")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Add New Establishment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

