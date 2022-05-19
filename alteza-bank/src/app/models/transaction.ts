import { User } from './user';

export interface Transaction {
  from: User;
  to: User;
  amount: string;
  date: string;
}
