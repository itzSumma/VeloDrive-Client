import Link from "next/link";
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa6"; 

const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-950 px-6 py-16 text-slate-400 md:px-16">
      <div className="mx-auto max-w-7xl">
        
       
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white md:text-6xl">DriveFleet</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed md:text-base">
            Reliable car rentals, simple booking, and owner tools for managing vehicle listings. 
            Find your perfect ride or list your vehicle today.
          </p>
        </div>

     
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          
         
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li>Rajshahi, Bangladesh</li>
              <li className="hover:text-white transition cursor-pointer">support@drivefleet.com</li>
              <li>+880 1700 000 000</li>
            </ul>
          </div>

       
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/cars" className="hover:text-white transition">Explore Cars</Link></li>
              <li><Link href="/add-car" className="hover:text-white transition">Add Car</Link></li>
              <li><Link href="/my-bookings" className="hover:text-white transition">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:text-white transition">Help Center</li>
              <li className="cursor-pointer hover:text-white transition">Rental Policy</li>
              <li className="cursor-pointer hover:text-white transition">Privacy Policy</li>
            </ul>
          </div>

         
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Follow Us</h3>
            <div className="flex gap-4">
              
             
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded bg-slate-900 text-white hover:bg-cyan-500 transition-all duration-300">
                <FaXTwitter size={14} />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded bg-slate-900 text-white hover:bg-cyan-500 transition-all duration-300">
                <FaLinkedinIn size={14} />
              </a>

              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded bg-slate-900 text-white hover:bg-cyan-500 transition-all duration-300">
                <FaFacebookF size={14} />
              </a>

            </div>
          </div>
        </div>

        
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-900 pt-6 md:flex-row">
          <p className="text-xs">© 2026 DriveFleet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;