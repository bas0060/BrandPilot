"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";


const STORAGE_KEY = "brandpilot:session";
const DIRECTORY_KEY = "brandpilot:directory";
const SESSION_EVENT = "brandpilot:session-changed";

export interface AuthUser {
  name: string;
  email: string;
}

function readDirectory(): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(DIRECTORY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function rememberInDirectory(user: AuthUser) {
  const directory = readDirectory();
  directory[user.email.trim().toLowerCase()] = user.name;
  window.localStorage.setItem(DIRECTORY_KEY, JSON.stringify(directory));
}

function lookupName(email: string): string | null {
  return readDirectory()[email.trim().toLowerCase()] ?? null;
}

interface StoredSession {
  user: AuthUser;
  loggedInAt: string;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(SESSION_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SESSION_EVENT, callback);
  };
}

function getSnapshot(): string | null {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return null;
}

function subscribeNoop() {
  return () => {};
}

function parseSession(raw: string | null): AuthUser | null {
  if (!raw) return null;
  try {
    const parsed: StoredSession = JSON.parse(raw);
    return parsed.user ?? null;
  } catch {
    return null;
  }
}

function writeSession(user: AuthUser) {
  const payload: StoredSession = { user, loggedInAt: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event(SESSION_EVENT));
}

function clearStoredSession() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function useAuth() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isHydrated = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  const user = useMemo(() => parseSession(raw), [raw]);

  const login = useCallback((nextUser: AuthUser) => {
    rememberInDirectory(nextUser);
    writeSession(nextUser);
  }, []);

  const loginWithEmail = useCallback((email: string) => {
    const name = lookupName(email) ?? email.split("@")[0];
    writeSession({ name, email });
  }, []);

  const logout = useCallback(() => {
    clearStoredSession();
  }, []);

  return {
    user,
    isLoggedIn: !!user,
    isLoading: !isHydrated,
    login,
    loginWithEmail,
    logout,
  };
}