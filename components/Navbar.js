import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "./icons/home.svg";
import PoolIcon from "./icons/pool.svg";
import TokenIcon from "./icons/token.svg";

const navLinks = [
  {
    label: "Home",
    icon: () => <HomeIcon />,
    href: "/",
  },
  {
    label: "Pools",
    icon: () => <PoolIcon />,
    href: "#",
  },
  {
    label: "Token",
    icon: () => <TokenIcon />,
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
          @apply text-gray-400 fill-current transition-all duration-200;
        }

        .nav-link:hover {
          @apply bg-yellow-100;
        }

        .nav-link:hover .icon path {
          @apply text-gray-500;
        }

        .nav-link.active,
        .nav-link.active .icon path {
          @apply text-black bg-yellow-500;
        }
      `}</style>

      <nav className="bg-white h-full py-12 w-24 text-center">
        <img
          alt="DODO Logo"
          className="w-16 rounded-full mx-auto"
          src="/images/dodo.png"
        />

        <hr className="w-10 mx-auto my-8" />

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
                  <div className="icon">{navLink.icon()}</div>
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
