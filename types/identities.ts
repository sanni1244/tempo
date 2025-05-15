// types/identities.ts

export interface Identity {
  id: string;              // Unique identifier for the identity
  name: string;            // Name of the identity
  description: string;     // Description of the identity
  createdAt: string;       // ISO string date format for when the identity was created
  updatedAt: string;       // ISO string date format for when the identity was last updated
  [key: string]: any;      // Allow additional fields for flexibility
}
