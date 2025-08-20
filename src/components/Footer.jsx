// components/Footer.tsx
import { Linkedin, Instagram, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAFAF6] text-green-900 px-8 py-12 border-t border-green-900/20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-400 flex items-center justify-center rounded-lg text-2xl font-bold text-green-900">
            V
          </div>
          <span className="text-2xl font-bold">Vritti</span>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2">
          <p className="font-medium">Sign up to our newsletter</p>
          <div className="flex gap-2 border-b border-green-900/50">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none py-1 text-sm w-60"
            />
            <button className="bg-green-900 text-yellow-400 px-4 py-1 rounded-md text-sm font-medium hover:bg-green-800">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-col md:flex-row justify-between items-start mt-10 text-sm gap-8">
        {/* Left Links */}
        <div className="flex gap-6">
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* Social */}
        <div className="flex gap-4">
          <a href="#">
            <Linkedin size={20} />
          </a>
          <a href="#">
            <X size={20} />
          </a>
          <a href="#">
            <Instagram size={20} />
          </a>
        </div>
      </div>

      <hr className="my-10 border-green-900/20" />

      {/* Bottom Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Product</h4>
          <ul className="space-y-1">
            <li><a href="#">Mood Journal</a></li>
            <li><a href="#">Daily Prompts</a></li>
            <li><a href="#">AI Summaries</a></li>
            <li><a href="#">Emotional Charts</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Industry</h4>
          <ul className="space-y-1">
            <li><a href="#">Students</a></li>
            <li><a href="#">Professionals</a></li>
            <li><a href="#">Therapists</a></li>
            <li><a href="#">Startups</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1">
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">For Investors</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
