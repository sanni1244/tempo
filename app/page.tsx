'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
    const { manager } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // if (!manager) {
        //     router.push('/(auth)/login');
        // } else {
            router.push('/dashboard');
        // }
    }, [manager, router]);

    if (!manager) return <p>Loading manager...</p>;

    return null;
}
