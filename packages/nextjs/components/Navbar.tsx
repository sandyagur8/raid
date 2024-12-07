'use client'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Battle Arena', path: '/battle' },
    { name: 'Swap', path: '/swap' },
    { name: 'Create Token', path: '/mint' },
  ];

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between flex-wrap bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center flex-shrink-0 text-white mr-6"
        >
          <span className="font-bold text-xl">Meme Battle</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex-grow flex items-center w-auto">
          <div className="text-sm flex-grow">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block mt-4 lg:inline-block lg:mt-0 mr-4
                  transition-colors duration-200
                  ${pathname === link.path 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}; 
