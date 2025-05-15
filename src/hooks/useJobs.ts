import {useQuery} from '@tanstack/react-query'
import {JobDto} from '@/types/api'
import {api} from '@/services/apiClient'

export const useJobs = (managerId: string) => {
    return useQuery<JobDto[]>({
        queryKey: ['jobs', managerId],
        queryFn: async () => {
            const {data} = await api.get('/jobs', {
                params: { managerId }
            })
            return data
        },
        enabled: !!managerId, // prevent query from running if managerId is falsy
    })
}
