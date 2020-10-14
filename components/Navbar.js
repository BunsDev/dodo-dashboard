import Link from "next/link";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Pools",
    href: "/pools",
  },
  {
    label: "Token",
    href: "/token",
  },
];

const Navbar = () => (
  <nav className="bg-white h-full py-12 w-24 text-center">
    <img
      alt="DODO Logo"
      className="w-16 rounded-full mb-12 mx-auto"
      src="/images/dodo.png"
    />
    <ul>
      {navLinks.map((navLink) => (
        <li key={navLink.href}>
          <Link href={navLink.href}>
            <a>{navLink.label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
