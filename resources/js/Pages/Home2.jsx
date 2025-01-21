import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronDown, Menu, X, Check, ArrowRight } from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-xl font-bold text-indigo-600">Digital Menu</Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} 
                   className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                  {item.name}
                </a>
              ))}
              <Link href="/register" 
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <a key={item.name} href={item.href}
                   className="block px-3 py-2 text-base text-gray-600 hover:text-indigo-600">
                  {item.name}
                </a>
              ))}
              <Link href="/register" 
                    className="block px-3 py-2 text-base text-indigo-600 font-medium">
                Get Started →
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight">
            Your Menu,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              Reimagined
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your restaurant's menu into an interactive digital experience. 
            Delight your customers and boost your revenue.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" 
                  className="px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors">
              Start Free Trial
            </Link>
            <a href="#demo" 
               className="px-8 py-3 text-base font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors">
              View Demo
            </a>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Updates",
                description: "Change prices and items in real-time. Updates reflect immediately across all devices."
              },
              {
                title: "Smart QR Codes",
                description: "Unique QR codes for each table. Track views and popular items automatically."
              },
              {
                title: "Multi-language",
                description: "Automatic menu translation into multiple languages. Serve international customers easily."
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                features: ["50 menu items", "Basic analytics", "QR code generation"]
              },
              {
                name: "Professional",
                price: "$79",
                period: "/month",
                features: ["Unlimited items", "Advanced analytics", "Custom branding", "Priority support"]
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                features: ["Multi-location", "API access", "Dedicated support", "Custom features"]
              }
            ].map((plan, index) => (
              <div key={index} 
                   className={`p-6 rounded-2xl ${
                     index === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-gray-900'
                   }`}>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-sm opacity-80">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <Check className="h-5 w-5 flex-shrink-0" />
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" 
                      className={`mt-8 block w-full py-2 px-4 rounded-full text-center ${
                        index === 1 
                          ? 'bg-white text-indigo-600 hover:bg-gray-100' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      } transition-colors`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Common Questions</h2>
          <div className="mt-8 space-y-4">
            {[
              {
                q: "How quickly can I get started?",
                a: "Setup takes less than 5 minutes. Upload your menu, customize your design, and generate QR codes instantly."
              },
              {
                q: "Can I update my menu anytime?",
                a: "Yes! Update your menu instantly through our dashboard. Changes appear immediately across all devices."
              },
              {
                q: "Do I need special hardware?",
                a: "No special hardware needed. Customers just need their smartphones to scan the QR code."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.q}</span>
                  <ChevronDown className={`transform transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>
                {openFaq === index && (
                  <p className="mt-4 text-gray-600">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#about" className="text-sm text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">© 2024 Digital Menu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}