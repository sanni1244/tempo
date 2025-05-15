export interface ManagerDto {
    id: string
    fullName: string
    companyName: string
    companyDescription: string
    createdAt: string // ISO 8601 UTC timestamp
}


export type Manager = {
  id: string;
  fullName: string;
  email: string;
  identities: Identity[];
};

export interface Managerdetails {
  id: string;
  fullName: string;
  email: string;
  companyName: string;
  companyDescription: string;
  createdAt: string;
  groups: Array<{
    id: string;
    title: string;
    fields: Array<{
      id: string;
      label: string;
      type: 'text' | 'radio' | 'checkbox';
      required: boolean;
      options?: string[];
    }>;
  }>;
}

export interface JobsClientProps {
  managerId: string;
  onFetchSuccess: (data: Job[]) => void; 
  onFetchError: (error: string) => void;
  onLoading: (loading: boolean) => void;
  onJobSelect: (job: Job | null) => void;
}

//   export interface EditManagerProps {
//     manager: Managerdetails;
//     onManagerUpdated: (updatedManager: Managerdetails) => void;
//     onCancel: () => void;
//     setLoading: React.Dispatch<React.SetStateAction<boolean>>;
//     setMessage: React.Dispatch<React.SetStateAction<string | null>>;
//   }

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  roles: string[];
  country: string;
  state: string;
  city: string;
  workMode: string;
  whyJoinUs: string;
  status: string;
  applicantCount: number;
  createdAt: string;
}
export interface Identity {
  id: string;
  identity: string;
  identityType: string;
  verificationStatus: string;
  managerId: string;
  createdAt: string;
  updatedAt: string; 
}

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode; // Add children to the props
  // Add other props here if necessary
}

export interface FormField {
  label: string;
  type: string;
  options?: string[];
  required: boolean;
  applicantFieldMapping?: string;
  sortOrder: number;
}


export interface Template {
  id: string;
  initialTemplate: [];
  title: string;
  name: string;
  group: string;
  formType: string;
  groups: FormGroup[];
  fields: FormField[];
  description?: string;
  createdAt: string;
  updatedAt?: string;
  version?: number;
}

export interface Group {
  id?: string;
  title: string;
  sortOrder: number;
  fields?: Field[];
}

export interface Field {
  id?: string;
  label: string;
  type: string;
  
  required: boolean;
  options: string;
  applicantFieldMapping?: string;
  sortOrder: number;
  fields: '';
}

export interface Form {
  id: string;
  title: string;
  // managerId: string;
  formType: string;
  groups: FormGroup[];
  createdAt: string;
  fields: FormField[];
  label: string;
  type: string;
  required: boolean;
  applicantFieldMapping?: string;
  sortOrder: number;
  id?: string;
  placeholder?: string;
  helpText?: string;
  defaultValue?: string;
  validationPattern?: string;
}

export interface FormGroupTemplate {
  id?: string;
  title: string;
  fields: FormField[];
}

export interface LocalField {
  id?: string;
  label: string;
  type: string;
  options?: string; // Keep as string for input
  required?: boolean;
  applicantFieldMapping?: string;
  sortOrder: number;
}


export interface FormGroup {
  id?: string;
  title: string;
  sortOrder: number;
  fields: FormField[];
  createdAt?: string;
}


export interface EditFormProps {
  initialTemplate: string;
  managerId: string | null;
  jobId: string | null;
  onTemplateUpdated: (updatedTemplate: Template) => void;
  onCancel: () => void;
}

export interface Response {
  label: string;
  value: any;
  fileUrl: string;
  fieldId: string;
  createdAt: string;
}

export interface FormResponse {
  applicantId: string;
  createdAt: string;
  d: string;
  token: string;
  isActive: boolean;
  responses: Response[];
}

export interface ApiResponse {
  data: FormResponse[];
  total: number;
  page: number;
  limit: number;
}

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


export interface Response {
  label: string;
  value: Record<string, unknown>;
  fileUrl: string;
  fieldId: string;
  createdAt: string;
}

export interface ApplicantResponse {
  applicantId: string;
  createdAt: string;
  responses: Response[];
}

export interface ResponsesData {
  data: ApplicantResponse[];
  total: number;
  page: number;
  limit: number;
  form: Form;
  responses: Response[];
}

interface RawApplicantResponse {
  applicantId: string;
  createdAt: string;
  id: string;
  responses: {
    fieldId: string;
    label: string;
    value: string | string[];
  }[];
}

export interface ApplicantResponse {
  emailAddress: string;
  fullName: string;
  firstname: string;
  lastname: string;
  middleName: string;
  phone: string;
  jobTitle?: string;
  dateOfBirth?: string;
  location?: string;
  yearsOfExperience?: string;
  howWorkTeams?: string;
  status: string;
  createdAt: string;
}
