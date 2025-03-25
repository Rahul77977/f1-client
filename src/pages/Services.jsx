import React from "react";
import Layout from "../components/Layouts/Layout.jsx";
import { useAuth } from "../store/Auth.jsx";
import {
  Wifi,
  Coffee,
  Tv2,
  BedSingle,
  ShieldCheck,
  ConciergeBell,
  Bath,
  ParkingCircle,
} from "lucide-react"; // Example icons from lucide-react

// Replace with your actual banner or hero image path
import banner from "../assets/gallery1.jpg";

const Services = () => {
  const { user } = useAuth();

  // Updated features array with icons & descriptions
  const features = [
    {
      title: "Comfortable Bedding",
      description: "Cozy beds with premium linens for a restful stay",
      Icon: BedSingle,
    },
    {
      title: "En-Suite Bathrooms",
      description: "Modern bathrooms with hot/cold showers & toiletries",
      Icon: Bath,
    },
    {
      title: "High-Speed Wi-Fi",
      description: "Complimentary internet for all your browsing needs",
      Icon: Wifi,
    },
    {
      title: "24/7 Security",
      description: "Safe & secure environment with round-the-clock staff",
      Icon: ShieldCheck,
    },
    {
      title: "In-Room Dining",
      description: "Delicious meals served right at your doorstep",
      Icon: ConciergeBell,
    },
    {
      title: "Entertainment",
      description: "In-room TV with local & international channels",
      Icon: Tv2,
    },
    {
      title: "Refreshments",
      description: "On-site café offering coffee, tea & light snacks",
      Icon: Coffee,
    },
    {
      title: "Parking Facilities",
      description: "Ample parking space for hassle-free vehicle safety",
      Icon: ParkingCircle,
    },
  ];

  return (
    <Layout title="Our Services">
      {/* Hero / Banner Section */}
      <section
        className="relative w-full h-[320px] md:h-[450px] bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 uppercase tracking-wider drop-shadow-lg">
            Gagan Delux Lodge
          </h1>
          <p className="text-sm md:text-base font-medium">
            Beside Delux Oven Bakery, Opposite Rural Police Station, Chikkaballapur - 562101
          </p>
          <p className="mt-2 text-lg md:text-2xl font-semibold drop-shadow-md">
            Exceeding Expectations for Every Stay
          </p>
          <p className="mt-1 text-sm md:text-base italic">
            Grand Opening on 17-02-2025 (Monday)
          </p>
          <p className="mt-2 text-xs md:text-sm">
            Welcome, {user?.name || "Guest"}!
          </p>
        </div>
      </section>

      {/* First Marquee / Ticker Animation */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2">
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="6"
          className="font-semibold text-sm md:text-base tracking-wide"
        >
          Hurry Up! Limited rooms available &nbsp; | &nbsp; Call us at 08156-450-587 &nbsp; | &nbsp; 
          24/7 Front Desk &amp; Security &nbsp; | &nbsp; Free Wi-Fi &nbsp; | &nbsp; 
          AC &amp; Non-AC Rooms
        </marquee>
      </div>

      {/* Keys & Facilities (Features) Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
          Our Key Facilities &amp; Services
        </h2>
        <div className="max-w-7xl mx-auto px-4 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {features.map(({ title, description, Icon }, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                {/* Icon Section */}
                <div className="mb-4 text-blue-600 group-hover:text-blue-800 transition-colors duration-300">
                  <Icon size={40} />
                </div>
                {/* Title */}
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {title}
                </h3>
                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base">
                  {description}
                </p>
              </div>
              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Second Marquee / Ticker Animation */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 mt-4">
        <marquee
          behavior="scroll"
          direction="right"
          scrollamount="6"
          className="font-semibold text-sm md:text-base tracking-wide"
        >
          Complimentary Breakfast &nbsp; | &nbsp; Modern Amenities &nbsp; | &nbsp;
          Conference Facilities &nbsp; | &nbsp; Restaurant &amp; Bar &nbsp; | &nbsp;
          Book Now to Avail Special Offers!
        </marquee>
      </div>
    </Layout>
  );
};

export default Services;
