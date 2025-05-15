import { ManagerDto } from '@/types/api'
import { api } from './apiClient'

export async function getManagerById(id: string): Promise<ManagerDto> {
    const res = await api.get(`/managers/${id}`)
    return res.data
}

export async function createManager(data: {
    fullName: string
    email: string
    companyName: string
    companyDescription: string
}): Promise<ManagerDto> {
    const res = await api.post('/managers', data)
    return res.data
}
