export enum FormType {
    APPLICATION = 'application',
    ASSESSMENT = 'assessment',
    OTHERS = 'others',
}

export enum FieldType {
    TEXT = 'text',
    TEXT_AREA = 'text area',
    URL = 'url',
    PHONE = 'phone',
    CITY = 'city',
    DATE = 'date',
    COUNTRY = 'country',
    STATE = 'state',
    ZIPCODE = 'zipcode',
    SELECT = 'select',
    CHECKBOX = 'checkbox',
    NUMBER = 'number',
    RATING = 'rating',
    RADIO = 'radio',
    EMAIL = 'email',
    DOCUMENT = 'document',
}

export enum ApplicantFieldMapping {
    NONE = 'none',
    EMAIL = 'email',
    FIRST_NAME = 'firstname',
    MIDDLE_NAME = 'middle name',
    LAST_NAME = 'lastname',
    PHONE = 'phone',
    FULL_NAME = 'full name',
}

// --------- Request types sent to backend ---------

/** a single field inside a form template */
export type FormFieldRequest = {
    label: string
    type: FieldType
    /** only for select/radio/checkbox/rating */
    options?: string[]
    required: boolean
    /** maps to applicant property, if any */
    applicantFieldMapping?: ApplicantFieldMapping
    /** zero-based order in its group */
    sortOrder?: number
}

/** optional grouping of fields within a template */
export type FormGroupRequest = {
    title?: string
    fields: FormFieldRequest[]
    /** zero-based order among groups */
    sortOrder?: number
}

/** payload when creating a new form template */
export interface CreateFormTemplateRequest {
    title: string
    managerId: string
    formType: FormType
    /** if you want explicit groups; otherwise backend will bucket `fields` into a default group */
    groups?: FormGroupRequest[]
    /** ungrouped fields; backend wraps these into a default group */
    fields?: FormFieldRequest[]
}

// --------- Server-returned DTOs (for reference) ---------

// ------------ FormField DTO ------------

export type FormFieldDto = {
    id: string
    label: string
    type: FieldType
    options?: string[]
    required: boolean
    applicantFieldMapping?: ApplicantFieldMapping
    createdAt: string
}

// ------------ FieldGroup DTO ------------

export type FieldGroupDto = {
    id: string
    title?: string
    sortOrder?: number
    fields: FormFieldDto[]
    createdAt: string
}

// ------------ FormTemplate DTO ------------

export type FormTemplateDto = {
    id: string
    title: string
    formType: FormType
    groups: FieldGroupDto[]
    createdAt: string
}


/**
 * When editing an existing template, you PATCH with this shape
 */
export interface UpdateFieldRequest {
    /** Field UUID (for updates) */
    id?: string;
    label: string;
    type: FieldType;
    options?: string[];
    required: boolean;
    applicantFieldMapping?: ApplicantFieldMapping;
    sortOrder?: number;
}

export interface UpdateGroupRequest {
    /** Group UUID (for updates) */
    id?: string;
    title?: string;
    fields?: UpdateFieldRequest[];
    sortOrder?: number;
}

export interface UpdateFormRequest {
    /** New title (optional) */
    title?: string;
    /** New formType (optional) */
    formType?: FormType;
    /** Explicit group updates (optional) */
    groups?: UpdateGroupRequest[];
    /** Ungrouped field updates (optional) */
    fields?: UpdateFieldRequest[];
}