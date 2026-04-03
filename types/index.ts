import { Status } from "../app/(tabs)/profile/types/index";

export interface AuthContextType {
  isAuthenticated: boolean;
  error: string | null;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
  bio: string | null;
  status: Status;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  uploadAvatar: (uri: string) => Promise<void>;
  updateBio: (bio: string) => Promise<void>;
  updateStatus: (status: Status) => Promise<void>;
}
export interface AvatarMenuProps {
  avatarUrl: string | null;
  signOut: () => Promise<void>;
  uploadAvatar: (uri: string) => Promise<void>;
}

export interface MenuPosition {
  top: number;
}

export type Question = {
  id: number;
  Text: string;
  Date: string;
};

export type Answer = {
  id: number;
  content: string;
  user_id: string;
  created_at: string;
};
