export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
}
