import Link from "next/link";
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/5 pt-16 pb-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
        
        
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
            DriveFleet.
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Premium rentals for everyday journeys. Reliable, secure, and fully automated car booking system.
          </p>
         
          <div className="flex items-center gap-3 mt-2">
            <a href="#" className="h-9 w-9 flex items-center justify-center rounded border border-white/10 bg-white/5 text-slate-400 transition-colors hover:text-cyan-400 hover:border-cyan-500/40"><FiFacebook size={16} /></a>
            
           
            <a href="#" className="h-9 w-9 flex items-center justify-center rounded border border-white/10 bg-white/5 text-slate-400 transition-colors hover:text-cyan-400 hover:border-cyan-500/40">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>

            <a href="#" className="h-9 w-9 flex items-center justify-center rounded border border-white/10 bg-white/5 text-slate-400 transition-colors hover:text-cyan-400 hover:border-cyan-500/40"><FiInstagram size={16} /></a>
            <a href="#" className="h-9 w-9 flex items-center justify-center rounded border border-white/10 bg-white/5 text-slate-400 transition-colors hover:text-cyan-400 hover:border-cyan-500/40"><FiLinkedin size={16} /></a>
          </div>
        </div>

      
        <div>
          <h3 className="text-sm font-bold tracking-wider text-slate-300 uppercase mb-4">Useful Links</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/cars" className="transition-colors hover:text-cyan-400">Explore All Cars</Link></li>
            <li><Link href="/about" className="transition-colors hover:text-cyan-400">About Us</Link></li>
            <li><Link href="/privacy" className="transition-colors hover:text-cyan-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="transition-colors hover:text-cyan-400">Terms of Service</Link></li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-sm font-bold tracking-wider text-slate-300 uppercase mb-4">Contact Info</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5"><FiMapPin className="text-cyan-400 shrink-0 mt-0.5" /><span className="leading-relaxed">123 Fleet Street, Rajshahi, Bangladesh</span></li>
            <li className="flex items-center gap-2.5"><FiPhone className="text-teal-400 shrink-0" /><span>+880 1234 567890</span></li>
            <li className="flex items-center gap-2.5"><FiMail className="text-blue-400 shrink-0" /><span>support@drivefleet.com</span></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-sm font-bold tracking-wider text-slate-300 uppercase mb-4">Newsletter</h3>
          <p className="text-xs text-slate-400 mb-3">Subscribe to receive regular premium discount updates.</p>
          <div className="flex rounded border border-white/10 overflow-hidden bg-white/5 focus-within:border-cyan-500/50 transition-colors">
            <input type="email" placeholder="Email Address" className="w-full bg-transparent px-3 py-2 text-xs text-white focus:outline-none" />
            <button className="bg-cyan-500 text-slate-950 font-bold px-4 text-xs transition-colors hover:bg-cyan-400">Join</button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} VeloDrive Car Rental System. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;