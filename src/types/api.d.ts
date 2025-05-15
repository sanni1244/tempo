export interface ManagerDto {
    id: string
    fullName: string
    companyName: string
    companyDescription: string
    createdAt: string // ISO 8601 UTC timestamp
}

export interface JobDto {
    id: string
    title: string
    roles: string[]
    requirements: string[]
    description: string
    candidateCount: number
    createdAt: string
}

