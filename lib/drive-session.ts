import "server-only";
import { randomUUID } from "crypto";
import type { Credentials } from "google-auth-library";

export type StoredAccount = {
  id: string;
  email: string;
  name: string;
  picture?: string;
  credentials: Credentials;
  color: string;
};

type Session = { states: Set<string>; accounts: Map<string, StoredAccount> };
const sessionStore = globalThis as typeof globalThis & { driveHarborSessions?: Map<string, Session> };
const sessions = sessionStore.driveHarborSessions ?? new Map<string, Session>();
sessionStore.driveHarborSessions = sessions;

function getSession(id: string) {
  let session = sessions.get(id);
  if (!session) { session = { states: new Set(), accounts: new Map() }; sessions.set(id, session); }
  return session;
}

export function newSessionId() { return randomUUID(); }
export function createState(sessionId: string) { const state = randomUUID(); getSession(sessionId).states.add(state); return state; }
export function useState(sessionId: string, state: string) { return getSession(sessionId).states.delete(state); }
export function saveAccount(sessionId: string, account: StoredAccount) { getSession(sessionId).accounts.set(account.id, account); }
export function removeAccount(sessionId: string | undefined, accountId: string) { if (sessionId) getSession(sessionId).accounts.delete(accountId); }
export function getAccounts(sessionId?: string) { return sessionId ? [...getSession(sessionId).accounts.values()] : []; }
export function getAccount(sessionId: string | undefined, accountId?: string) { const accounts = getAccounts(sessionId); return accountId ? accounts.find((account) => account.id === accountId) : accounts[0]; }
