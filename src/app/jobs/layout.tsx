import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";

export default function JobsLayout({children}: {children: React.ReactNode}) {
    return <DashboardLayout>{children}</DashboardLayout>
}
