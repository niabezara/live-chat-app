import { supabase } from "@/lib/supabase";
import { AuthContextType } from "@/types";
import { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Status } from "../app/(tabs)/profile/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function extractUserFields(user: User | null | undefined) {
  return {
    email: user?.email ?? null,
    name: user?.user_metadata?.name ?? null,
    avatarUrl: user?.user_metadata?.avatar_url ?? null,
    bio: user?.user_metadata?.bio ?? null,
    status: user?.user_metadata?.status as Status,
  };
}

async function buildAvatarPayload(
  uri: string,
): Promise<{ arrayBuffer: ArrayBuffer; mimeType: string; ext: string }> {
  const response = await fetch(uri);
  const blob = await response.blob();
  const mimeType = blob.type || "image/jpeg";
  const ext = mimeType.split("/")[1] ?? "jpeg";
  const arrayBuffer = await new Response(blob).arrayBuffer();
  return { arrayBuffer, mimeType, ext };
}

//provides auth state and actions to the app

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("online");

  const applySession = (session: Session | null) => {
    const fields = extractUserFields(session?.user);
    setIsAuthenticated(!!session);
    setEmail(fields.email);
    setName(fields.name);
    setAvatarUrl(fields.avatarUrl);
    setBio(fields.bio);
    setStatus(fields.status);
  };

  // Seed state from live Supabase user (bypasses stale session metadata)
  const refreshUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const fields = extractUserFields(user);
    setEmail(fields.email);
    setName(fields.name);
    setAvatarUrl(fields.avatarUrl);
    setBio(fields.bio);
    setStatus(fields.status);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      applySession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      applySession(session),
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      return false;
    }
    return true;
  };

  // No need to manually setIsAuthenticated — onAuthStateChange handles it
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const uploadAvatar = async (uri: string): Promise<void> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");

    const { arrayBuffer, mimeType, ext } = await buildAvatarPayload(uri);
    const filePath = `${user.id}/avatar_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, arrayBuffer, { contentType: mimeType, upsert: true });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    });

    if (updateError) throw updateError;

    setAvatarUrl(publicUrl);
  };

  const updateBio = async (newBio: string): Promise<void> => {
    const { error } = await supabase.auth.updateUser({ data: { bio: newBio } });
    if (error) throw error;
    setBio(newBio);
  };

  const updateStatus = async (newStatus: Status): Promise<void> => {
    const { error } = await supabase.auth.updateUser({
      data: { status: newStatus },
    });
    if (error) throw error;
    setStatus(newStatus);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        error,
        email,
        name,
        status,
        avatarUrl,
        bio,
        signIn,
        signOut,
        refreshUser,
        uploadAvatar,
        updateBio,
        updateStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
