'use client'

import React, {createContext, useContext, useEffect, useState} from 'react'
import {ManagerDto} from '@/app/types/api'
import {getManagerById} from '@/services/managerService'

type AuthContextType = {
    manager: ManagerDto | null
    setManager: (manager: ManagerDto) => void
    clearManager: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [manager, setManagerState] = useState<ManagerDto | null>(null)

    // Hardcoded temp managerId (replace with .env or fetch logic later)
    const TEMP_MANAGER_ID = '606c6fc0-cc53-4543-8eb7-ae2f6353ca4d'

    useEffect(() => {
        void (async () => {
            const storedId = localStorage.getItem('managerId') || TEMP_MANAGER_ID
            try {
                const m = await getManagerById(storedId)
                setManagerState(m)
                localStorage.setItem('managerId', m.id)
            } catch (err) {
                console.warn('Failed to load manager, bypassing with TEMP_MANAGER_ID:', err)
                console.info('Bypassing authentication with TEMP_MANAGER_ID')
                setManagerState({ 
                    id: TEMP_MANAGER_ID, 
                    name: 'Temporary Manager', 
                    fullName: 'Temporary Manager Full Name', 
                    companyName: 'Temporary Company', 
                    companyDescription: 'Temporary Description', 
                    createdAt: new Date().toISOString() 
                } as ManagerDto)
                localStorage.setItem('managerId', TEMP_MANAGER_ID)
            }
        })()
    }, [])

    const setManager = (m: ManagerDto) => {
        setManagerState(m)
        localStorage.setItem('managerId', m.id)
    }

    const clearManager = () => {
        setManagerState(null)
        localStorage.removeItem('managerId')
    }

    return (
        <AuthContext.Provider value={{manager, setManager, clearManager}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        console.error('useAuth must be used inside <AuthProvider>');
        return { manager: null, setManager: () => {}, clearManager: () => {} };
    }
    return ctx
}
