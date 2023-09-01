"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import { siteConfig } from "@/config/site";

type AdminNavProps = {
  items: SidebarNavItem[];
};

const AdminNav = ({ items }: AdminNavProps) => {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <div className="flex flex-row items-center border-b h-16 cursor-pointer">
        <Image
          className="-mx-4"
          src="https://www.lifloelectronics.co.ke/wp-content/uploads/2021/10/kenya-police-logo-white.png"
          width={80}
          height={50}
          alt="Kenya Police Logo"
        />
        <span className="font-bold">{siteConfig.name}</span>
      </div>
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
};

export default AdminNav;
