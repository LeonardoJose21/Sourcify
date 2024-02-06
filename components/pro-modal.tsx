"use client"

import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-model";
import { Badge } from "./ui/badge";
import { CheckCheck, Zap } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const ProModal = () => {
    const proModal = useProModal();

    return (
        <div>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">

                            <div className="flex items-center gap-x-2 font-bold py-1">
                                Upgrade to genius
                                <Badge className="uppercase text-sm py-1" variant="premium">
                                    pro
                                </Badge>
                            </div>

                        </DialogTitle>
                        <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                            Holis
                            <CheckCheck />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Link href="/check-out" className="w-full">
                            <Button size="lg" variant="premium" className="w-full">
                                Upgrade
                                <Zap className="w-4 h-4 ml-2 fill-white" />
                            </Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}