'use client'

import React, {createContext, useContext, useEffect, useState} from 'react'
import {ManagerDto} from '@/types/api'
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
                const m = await getManagerById(storedId!) //temporary
                setManagerState(m)
                localStorage.setItem('managerId', m.id)
            } catch (err) {
                console.error('Failed to load manager:', err)
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
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
    return ctx
}
