export interface AuthContextType {
  isAuthenticated: boolean;
  error: string | null;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  uploadAvatar: (uri: string) => Promise<void>;
}
export interface AvatarMenuProps {
  avatarUrl: string | null;
  signOut: () => Promise<void>;
  uploadAvatar: (uri: string) => Promise<void>;
}

export interface MenuPosition {
  top: number;
}
