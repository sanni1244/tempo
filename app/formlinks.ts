// clients/formlinks.ts
import { apiRequest } from "@/lib/api";

export interface PublicFormLink {
  id: string;
  url: string;
  formId?: string;
  createdAt: string;
  isActive: boolean;
}

export function getPublicLinks(token?: string) {
  return apiRequest<PublicFormLink[]>("/form-links/public", {}, token);
}

export function getPublicLinkById(id: string, token?: string) {
  return apiRequest<PublicFormLink>(`/form-links/public/${id}`, {}, token);
}

export function createPublicLink(formId: string, token?: string) {
  return apiRequest<PublicFormLink>(
    "/form-links/public",
    {
      method: "POST",
      body: JSON.stringify({ formId }),
    },
    token
  );
}

export function deletePublicLink(id: string, token?: string) {
  return apiRequest<void>(
    `/form-links/public/${id}`,
    {
      method: "DELETE",
    },
    token
  );
}
