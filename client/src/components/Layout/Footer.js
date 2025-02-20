import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaDiscord,
  FaFacebook,
  FaInstagram
} from 'react-icons/fa';

const navigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Security', href: '/#security' },
    { name: 'Team', href: '/#team' },
    { name: 'Enterprise', href: '/#enterprise' },
    { name: 'Customer Stories', href: '/#testimonials' },
    { name: 'Pricing', href: '/#pricing' },
  ],
  support: [
    { name: 'Documentation', href: '/#docs' },
    { name: 'API Reference', href: '/#api' },
    { name: 'Status', href: '/#status' },
    { name: 'Support Center', href: '/#support' },
    { name: 'Community', href: '/#community' },
    { name: 'Developer Guide', href: '/#guide' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Careers', href: '/#careers' },
    { name: 'Press', href: '/#press' },
    { name: 'Partners', href: '/#partners' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/#privacy' },
    { name: 'Terms of Service', href: '/#terms' },
    { name: 'Cookie Policy', href: '/#cookies' },
    { name: 'GDPR', href: '/#gdpr' },
    { name: 'License', href: '/#license' },
    { name: 'Security', href: '/#security' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/zayid9',
      icon: FaGithub,
    },
    {
      name: 'Twitter',
      href: 'https://x.com/_zayid9',
      icon: FaTwitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/omar-mohamed8',
      icon: FaLinkedin,
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/Omermohamedabdi',
      icon: FaFacebook,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/_zayid9',
      icon: FaInstagram,
    },
  ],
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-900/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary-900/10 blur-3xl"></div>
      </div>

      <div className="container relative">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-800">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 mb-6">
              Stay up to date with the latest features, releases, and industry news.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={subscribed}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand Section */}
            <div className="col-span-2 lg:col-span-1">
              <div className="space-y-6">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  AuthMERN
                </Link>
                <p className="text-gray-400 text-sm max-w-md">
                  Secure authentication for modern web applications. Built with the latest 
                  technologies and best practices to keep your users safe and your 
                  application protected.
                </p>
                <div className="flex space-x-4">
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AuthMERN. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <Link to="/#privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <span>·</span>
              <Link to="/#terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <span>·</span>
              <Link to="/#cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 