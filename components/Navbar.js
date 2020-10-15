import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "./icons/home.svg";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Pools",
    href: "#",
  },
  {
    label: "Token",
    href: "#",
  },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        .nav-list li {
          @apply mb-2;
        }

        .nav-link {
          @apply text-gray-500 flex flex-col text-xs items-center justify-center h-20 rounded transition-all duration-200;
        }

        .nav-link .icon {
          @apply mt-1;
        }

        .nav-link .icon path {
          @apply fill-current;
        }

        .nav-link:hover {
          @apply text-gray-700 bg-yellow-200;
        }

        .nav-link.active {
          @apply text-black bg-yellow-400;
        }
      `}</style>

      <nav className="bg-white h-full py-12 w-24 text-center">
        <img
          alt="DODO Logo"
          className="w-16 rounded-full mb-12 mx-auto"
          src="/images/dodo.png"
        />
        <ul className="nav-list mx-2">
          {navLinks.map((navLink) => (
            <li key={navLink.href}>
              <Link href={navLink.href}>
                <a
                  className={
                    router.pathname === navLink.href
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  <div className="icon">
                    <HomeIcon />
                  </div>
                  <div className="mt-1">{navLink.label}</div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
