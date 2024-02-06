"use client";

import { Button } from "@/components/ui/button";
import { Menu} from "lucide-react";
import Sidebar from "@/components/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
    apiLimitCount: number;
}
const MobileSidebar = ({
    apiLimitCount
}: MobileSidebarProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (
    <Sheet>
        <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
        </Button> 
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
        <div className="bg-sky-950 text-neutral-200">
            <Sidebar apiLimitCount={apiLimitCount}/>
        </div>
        </SheetContent>

    </Sheet>
        
    );
}

export default MobileSidebar;