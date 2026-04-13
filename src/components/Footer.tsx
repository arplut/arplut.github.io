import { Link } from 'react-router-dom';
import { Mail, Linkedin, Instagram, MessageSquare } from 'lucide-react';
import logoSvg from '@/assets/LOGO_SVG.svg';

const Footer = () => {
  return (
    <footer className="bg-[#1B4332] text-white">
      <div className="container px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="inline-block group">
              <img
                src={logoSvg}
                alt="GEODHA"
                className="h-8 w-auto object-contain brightness-0 invert transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-sm text-white/65 leading-relaxed">
              Civic accountability for Bengaluru's 198 wards. Citizen-generated evidence → institutions act.
            </p>
            <div className="flex gap-2">
              <a
                href="mailto:contact@geodha.org"
                className="p-2 rounded-md border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/geodha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/geodha_org"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.reddit.com/r/geodha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Reddit"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">Platform</h3>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/data" className="hover:text-white transition-colors">Data &amp; Analysis</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/report" className="hover:text-[#F59E0B] transition-colors">Report a Problem</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">About</h3>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li>
                <a href="mailto:contact@geodha.org" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.geodha.community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Download App
                </a>
              </li>
            </ul>
          </div>

          {/* Download App CTA */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">Get Involved</h3>
            <p className="text-sm text-white/65 leading-relaxed">
              See a problem around you? Report it directly from your phone.
            </p>
            <Link
              to="/report"
              className="inline-block px-4 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-black text-sm font-semibold rounded-md transition-colors"
            >
              Report a Problem →
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2025 GEODHA. All rights reserved.</p>
          <p className="italic">Data sourced from BBMP grievance data (OpenCity dataset).</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
