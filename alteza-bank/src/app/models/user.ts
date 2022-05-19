export interface User {
  readonly _id: string;
  readonly accountNumber: string;
  initials: string;
  lastname: string;
  email?: string;
  street?: string;
  city?: string;
  phone?: string;
  readonly balance: string;
}
