"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[rgba(52,51,51,1)] text-white w-full">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1: Newsletter */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-bold text-lg mb-2">NEWSLETTER SUBSCRIPTION</h3>
          <p className="text-sm mb-4">
            Sign up for FabricHub updates to receive information about new arrivals, offers & promos.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <button className="text-left hover:text-red-500 text-sm">Fashion Fabrics</button>
            <button className="text-left hover:text-red-500 text-sm">Leather</button>
            <button className="text-left hover:text-red-500 text-sm">Buttons</button>
            <button className="text-left hover:text-red-500 text-sm">Sewing Notions</button>
            <button className="text-left hover:text-red-500 text-sm">Sale</button>
          </div>
        </div>

        {/* Column 3: More Information */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-bold text-lg mb-2">More Information</h3>
          <div className="flex flex-col gap-2">
            <button className="text-left hover:text-red-500 text-sm">About Us</button>
            <button className="text-left hover:text-red-500 text-sm">Privacy Policy</button>
            <button className="text-left hover:text-red-500 text-sm">Refund & Return / Exchange Policy</button>
            <button className="text-left hover:text-red-500 text-sm">Terms & Conditions</button>
          </div>
        </div>

        {/* Column 4: Contact & Social */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p className="text-sm mb-4">
            Phone: 077 1234 567<br />
            Operating Hours: Monday - Friday: 9.30 am - 5.30 pm<br />
            Email: FabricHub@gmail.com
          </p>
          <h3 className="font-bold text-lg mb-2">Connect With Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-red-500"><FaFacebookF className="w-5 h-5" /></a>
            <a href="#" className="hover:text-red-500"><FaInstagram className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-700 mt-8 text-center py-4 text-sm">
        © 2025 FabricHub. All rights reserved.
      </div>
    </footer>
  );
}
