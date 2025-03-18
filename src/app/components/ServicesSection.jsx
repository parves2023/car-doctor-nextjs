
import dbConnect from '@/lib/dbConnect';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaArrowRight } from "react-icons/fa";

export default async function ServicesSection() {

//  const res = await fetch('services.json');

const serviceCollection = dbConnect("test-services");

const data = await serviceCollection.find({}).toArray();



  return (
    <div className='container mx-auto my-10'>
        <div className='grid grid-cols-12 gap-4'>


        {data.map((i) => (
      <div
        key={i.service_id}
        className="col-span-12 max-w-[320px] md:col-span-6 lg:col-span-3 border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col justify-between"
      >
        {/* Image Container */}
        <div className="mx-auto mb-4 ">
          <Image
            src={i.img}
            width={314}
            height={208}
            alt="serviceimg"
            className="rounded-lg"
          />
        </div>

        {/* Text and Icon Container */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">{i.title}</h3>
            <p className="text-gray-600">${i.price}</p>
          </div>
          <Link href={`/services/${i._id}`}>
          <FaArrowRight className="text-2xl text-blue-500" />
          </Link>
        </div>
      </div>
    ))}


        
    </div>
    </div>
  )
}
