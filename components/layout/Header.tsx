
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Public Holidays", href: "/public-holidays" },
  { name: "About", href: "/about" },   
  { name: "Blogs", href: "/blogs" },
  { name: "Contact us", href: "/contact-us" },
];



export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">

        <Link href="/" >
          <Image
            src="/logo.png"
            alt="Bakasyon Tayo Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>

        <nav className="">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-gray-900 mx-4 font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>

      </div>







    </header>
  );
}