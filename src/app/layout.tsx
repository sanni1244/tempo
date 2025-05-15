import { QueryProvider } from '@/services/reactQuery'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <QueryProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryProvider>
        </body>
        </html>
    )
}
