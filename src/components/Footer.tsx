import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const links = [
    { href: "/", icon: "ph-house" },
    { href: "/people", icon: "ph-users-three" },
    { href: "/games", icon: "ph-game-controller" },
    { href: "/rooms", icon: "ph-chats" },
    { href: "/shop", icon: "ph-storefront" },
  ];

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 py-2 px-2 bg-slate-950">
        <div className="flex justify-around items-center">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <i
                className={`${
                  link.icon
                } text-2xl flex items-center py-1 px-5 rounded-2xl ${
                  pathname === link.href
                    ? "ph-fill text-blue-500 bg-blue-950"
                    : "ph"
                }`}
              ></i>
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
}
