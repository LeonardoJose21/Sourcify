"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google';
// import { usePathname } from 'next/navigation';
// import { TextSelectIcon, LayoutDashboard, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Filters } from "./filters";
import { FreeCounter } from "@/components/free-counter";
const poppins = Montserrat({ weight: '600', subsets: ['latin'] });

// const routes = [
//   {
//     label: 'Settings',
//     icon: Settings,
//     href: '/settings',
//   },
// ];

interface SidebarProps {
  apiLimitCount: number;
};


const Sidebar = (
  {apiLimitCount = 0 }: SidebarProps
) => {
  // const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-6">
          <div className="relative h-14 w-14 mr-1">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold text-green-400", poppins.className)}>
            Sourcify 
          </h1>
        </Link>
        <div className="space-y-1 mt-2">
          <div>
            <Filters />
          </div>
          {
            // routes.map((route) => (
            //   <Link
            //     key={route.href}
            //     href={route.href}
            //     className={cn(
            //       "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
            //       pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
            //     )}
            //   >
            //     <div className="flex items-center flex-1">
            //       <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
            //       {route.label}
            //     </div>
            //   </Link>
            // ))
          }
        </div>
      </div>
      <FreeCounter apiLimitCount = {apiLimitCount}/>
    </div>
  );
}

export default Sidebar;