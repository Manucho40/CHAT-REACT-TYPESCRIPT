import { User } from "./User";

export interface UsersState{
    entries: object,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    inform: string
}