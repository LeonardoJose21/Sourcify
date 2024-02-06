"use client"

import { useState, useEffect } from "react"
import { ProModal } from "./pro-modal";

export const ModalProvider = () => {
    const [isMonunted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMonunted) {
        return null;
    }

    return (
        <>
        <ProModal />
        </>
    )

}