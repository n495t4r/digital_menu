import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Dashboard({ establishments }) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Your Establishments</h1>
      {establishments.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">You haven't created any establishments yet.</p>
          <Link
            href={route('establishments.create')}
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
                  href={route('establishments.show', establishment.id)}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
                <Link
                  href={route('menu.edit', establishment.id)}
                  className="text-green-500 hover:underline"
                >
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
            href={route('establishments.create')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Add New Establishment
          </Link>
        </div>
      )}
    </Layout>
  );
}

