import { useQuery } from '@tanstack/react-query'
import { FormTemplateDto } from '@/types/form'
import { api } from '@/services/apiClient'

export const useFormTemplate = (templateId?: string | string[]) => {
    return useQuery<FormTemplateDto>({
        queryKey: ['formTemplate', templateId],
        enabled: typeof templateId === 'string',
        queryFn: async () => {
            // coerce to a single string
            const id = Array.isArray(templateId) ? templateId[0] : templateId
            const { data } = await api.get<FormTemplateDto>(`/form-templates/${id}`)
            return data
        },
    })
}
