import { QueryProvider } from '@/services/reactQuery'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'
import React from "react";
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <QueryProvider>
            <AuthProvider>
              <DashboardLayout>
                {children}

              </DashboardLayout>
            </AuthProvider>
        </QueryProvider>
        </body>
        </html>
    )
}
