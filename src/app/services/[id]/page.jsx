import dbConnect from '@/lib/dbConnect';
import React from 'react';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

export default async function ServiceDetailsPage({ params }) {
  const { id } = params;

  // Connect to the database and fetch the service details
  const servicesCollection = dbConnect('test-services');
  const data = await servicesCollection.findOne({ _id: new ObjectId(id) });

  if (!data) {
    return <div className="container mx-auto my-10 text-center">Service not found.</div>;
  }

  return (
    <div className="container mx-auto my-10 p-4">
      {/* Service Title and Price */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{data.title}</h1>
        <p className="text-2xl text-blue-600 font-semibold mt-2">${data.price}</p>
      </div>

      {/* Service Image */}
      <div className="flex justify-center mb-8">
        <Image
          src={data.img}
          width={600}
          height={400}
          alt={data.title}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Service Description */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
        <p className="text-gray-600">{data.description}</p>
      </div>

      {/* Service Facilities */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Facilities</h2>
        <div className="space-y-4">
          {data.facility.map((facility, index) => (
            <div key={index} className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              <div>
                <h3 className="text-lg font-medium text-gray-700">{facility.name}</h3>
                <p className="text-gray-600">{facility.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Button */}
      <div className="text-center">
        <button className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors duration-300">
          Checkout
        </button>
      </div>
    </div>
  );
}