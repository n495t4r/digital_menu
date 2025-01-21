import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <span className="sr-only">Digital Menu</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="/logo.svg"
                  alt="Digital Menu Logo"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                href="/login"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero section */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Restaurant interior"
                />
                <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply"></div>
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Revolutionize Your</span>
                  <span className="block text-indigo-200">Restaurant Experience</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Empower your business with our cutting-edge digital menu solution. Boost sales, enhance customer experience, and streamline operations - all in one platform.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <Link
                      href="/register"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                    >
                      Get started
                    </Link>
                    <a
                      href="#features"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div id="features" className="py-16 bg-white overflow-hidden lg:py-24">
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <svg
              className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
            </svg>

            <div className="relative">
              <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to manage your menu
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
                Our digital menu solution offers a range of features designed to boost your business and enhance customer satisfaction.
              </p>
            </div>

            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  Streamline Your Operations
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Effortlessly manage your menu, update prices, and showcase your dishes with our intuitive platform.
                </p>

                <dl className="mt-10 space-y-10">
                  {[
                    {
                      name: 'Easy Menu Management',
                      description:
                        'Update your menu in real-time, add new items, and adjust prices with just a few clicks.',
                    },
                    {
                      name: 'Dynamic QR Codes',
                      description:
                        'Generate unique QR codes for each table, allowing customers to view your menu instantly on their devices.',
                    },
                    {
                      name: 'Multi-language Support',
                      description:
                        'Cater to a diverse clientele with menus available in multiple languages.',
                    },
                  ].map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                <svg
                  className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                  width="784"
                  height="404"
                  fill="none"
                  viewBox="0 0 784 404"
                >
                  <defs>
                    <pattern
                      id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="784" height="404" fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
                </svg>
                <img
                  className="relative mx-auto"
                  width="490"
                  src="/img/features.svg"
                  alt="Feature illustration"
                />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works section */}
        <div id="how-it-works" className="bg-indigo-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">How It Works</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Get started in minutes
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our simple setup process ensures you can start using your digital menu quickly and easily.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    name: 'Sign Up',
                    description:
                      'Create your account and provide basic information about your establishment.',
                  },
                  {
                    name: 'Create Your Menu',
                    description:
                      'Add your menu items, categorize them, and set prices using our intuitive interface.',
                  },
                  {
                    name: 'Go Live',
                    description:
                      'Generate QR codes, place them on your tables, and watch as customers start using your digital menu.',
                  },
                ].map((step, index) => (
                  <div key={step.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <span className="text-lg font-bold">{index + 1}</span>
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{step.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{step.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Pricing section */}
        <div id="pricing" className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-center">Pricing Plans</h2>
              <p className="mt-5 text-xl text-gray-500 sm:text-center">
                Choose the perfect plan for your business needs
              </p>
            </div>
            <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
              {[
                {
                  name: 'Starter',
                  price: '$29',
                  description: 'Perfect for small cafes and food trucks',
                  features: [
                    'Up to 50 menu items',
                    'Basic analytics',
                    'QR code generation',
                    'Email support',
                  ],
                },
                {
                  name: 'Growth',
                  price: '$79',
                  description: 'Ideal for restaurants and bars',
                  features: [
                    'Up to 200 menu items',
                    'Advanced analytics',
                    'Custom branding',
                    'Priority email support',
                    'Table management',
                  ],
                },
                {
                  name: 'Enterprise',
                  price: 'Custom',
                  description: 'For large chains and franchises',
                  features: [
                    'Unlimited menu items',
                    'Advanced analytics with custom reports',
                    'Dedicated account manager',
                    '24/7 phone and email support',
                    'Multi-location management',
                    'API access',
                  ],
                },
              ].map((tier) => (
                <div key={tier.name} className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
                  <div className="p-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">{tier.name}</h2>
                    <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                    <p className="mt-8">
                      <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                      {tier.name !== 'Enterprise' && <span className="text-base font-medium text-gray-500">/mo</span>}
                    </p>
                    <Link
                      href="/register"
                      className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                    >
                      Get started
                    </Link>
                  </div>
                  <div className="pt-6 pb-8 px-6">
                    <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                    <ul className="mt-6 space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex space-x-3">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs section */}
        <div id="faqs" className="bg-gray-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
              <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Frequently asked questions
              </h2>
              <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                {[
                  {
                    question: "How does the digital menu work?",
                    answer:
                      "Our digital menu system generates unique QR codes for your establishment. Customers can scan these codes with their smartphones to view your menu instantly. You can update your menu in real-time through our easy-to-use dashboard.",
                  },
                  {
                    question: "Can I customize the look of my digital menu?",
                    answer:
                      "Our platform offers various customization options, including color schemes, fonts, and layouts. You can also add your logo and brand elements to create a cohesive look that matches your establishment's style.",
                  },
                  {
                    question: "Is it difficult to set up and maintain?",
                    answer:
                      "Not at all! Our system is designed to be user-friendly. You can set up your initial menu in minutes, and making updates is as simple as a few clicks. We also offer onboarding support to help you get started.",
                  },
                  {
                    question: "How secure is the platform?",
                    answer:
                      "We take security seriously. Our platform uses industry-standard encryption and security measures to protect your data and your customers' information. We regularly update our security protocols to stay ahead of potential threats.",
                  },
                ].map((faq) => (
                  <div key={faq.question} className="pt-6">
                    <dt className="text-lg">
                      <button
                        className="text-left w-full flex justify-between items-start text-gray-400"
                        onClick={() => {
                          // Toggle FAQ answer visibility
                        }}
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDown className="h-6 w-6" aria-hidden="true" />
                        </span>
                      </button>
                    </dt>
                    <dd className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 Digital Menu, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

