import {useQuery} from '@tanstack/react-query'
import {FormTemplateDto} from '@/types/form'
import {api} from '@/services/apiClient'
import {useAuth} from '@/context/AuthContext'

export const useFormTemplates = () => {
    const {manager} = useAuth()

    return useQuery<FormTemplateDto[]>({
        queryKey: ['formTemplates', manager?.id],
        enabled: !!manager?.id,
        queryFn: async () => {
            const {data} = await api.get('/form-templates', {
                params: {managerId: manager?.id},
            })
            return data
        },
    })
}
