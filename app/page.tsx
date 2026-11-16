"use client";

import { useEffect, useMemo, useState } from "react";

type Account = { id: string; email: string; name: string; picture?: string; used: number; limit: number; files: number; color: string };
type DriveItem = { id: string; name: string; mimeType: string; size: number; modifiedTime?: string; owners?: string[] };
type ApiData = { accounts: Account[]; items: DriveItem[]; currentAccountId?: string };
type Crumb = { id?: string; name: string };
const folderType = "application/vnd.google-apps.folder";

function bytes(value: number) { if (!value) return "0 B"; const u = ["B", "KB", "MB", "GB", "TB"]; const n = Math.min(Math.floor(Math.log(value) / Math.log(1000)), u.length - 1); return `${(value / 1000 ** n).toFixed(n > 1 ? 1 : 0)} ${u[n]}`; }
function percent(used: number, limit: number) { return limit ? Math.min(Math.round(used / limit * 100), 100) : 0; }
function isFolder(item: DriveItem) { return item.mimeType === folderType; }
function initials(label: string) { return label.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase(); }
function date(value?: string) { return value ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)) : "—"; }

function Mark({ small = false }: { small?: boolean }) { return <span className={`mark ${small ? "mark-small" : ""}`} aria-hidden="true"><i /><i /><i /></span>; }
function Avatar({ account }: { account: Account }) { const [failed, setFailed] = useState(false); const label = account.name || account.email; return <span className="avatar">{account.picture && !failed ? <img src={account.picture} alt="" onError={() => setFailed(true)} referrerPolicy="no-referrer" /> : initials(label)}</span>; }
function FileGlyph({ item }: { item: DriveItem }) { const kind = isFolder(item) ? "folder" : item.mimeType.includes("pdf") ? "pdf" : item.mimeType.includes("image") ? "image" : "file"; return <span className={`file-glyph ${kind}`} aria-hidden="true" />; }

export default function Home() {
  const [data, setData] = useState<ApiData | null>(null);
  const [accountId, setAccountId] = useState<string>();
  const [parentId, setParentId] = useState<string>();
  const [path, setPath] = useState<Crumb[]>([{ name: "My Drive" }]);
  const [screen, setScreen] = useState<"home" | "files">("home");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string>();
  const [pendingRemoval, setPendingRemoval] = useState<Account>();

  async function load(account = accountId, parent = parentId) {
    setLoading(true);
    try { const params = new URLSearchParams(); if (account) params.set("account", account); if (parent) params.set("parent", parent); const response = await fetch(`/api/drive?${params}`, { cache: "no-store" }); if (response.ok) { const next = await response.json() as ApiData; setData(next); setAccountId(next.currentAccountId); } } finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);
  const accounts = data?.accounts ?? [];
  const selected = accounts.find((account) => account.id === accountId) ?? accounts[0];
  const used = accounts.reduce((sum, account) => sum + account.used, 0);
  const capacity = accounts.reduce((sum, account) => sum + account.limit, 0);
  const visible = useMemo(() => (data?.items ?? []).filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => Number(isFolder(b)) - Number(isFolder(a))), [data?.items, query]);
  function browse(account: Account) { setAccountId(account.id); setParentId(undefined); setPath([{ name: "My Drive" }]); setQuery(""); setScreen("files"); void load(account.id); }
  function openFolder(item: DriveItem) { if (!isFolder(item)) return; setParentId(item.id); setPath((current) => [...current, { id: item.id, name: item.name }]); setQuery(""); void load(accountId, item.id); }
  function visit(index: number) { const next = path.slice(0, index + 1); const target = next.at(-1); setPath(next); setParentId(target?.id); setQuery(""); void load(accountId, target?.id); }
  async function remove(account: Account) { setRemoving(account.id); try { const response = await fetch(`/api/drive?account=${encodeURIComponent(account.id)}`, { method: "DELETE" }); if (response.ok) { setPendingRemoval(undefined); setScreen("home"); setPath([{ name: "My Drive" }]); setParentId(undefined); await load(); } } finally { setRemoving(undefined); } }

  if (loading && !data) return <main className="loading"><Mark /><span>Opening your drives</span></main>;
  if (!accounts.length) return <main className="landing"><header className="landing-header"><a className="wordmark" href="/"><Mark small /> archive</a></header><section className="connect-intro"><p className="eyebrow">A QUIET VIEW OF YOUR CLOUD</p><h1>Know where your<br /><em>space</em> goes.</h1><p className="intro-copy">Archive brings your Google Drives into one simple place. Nothing more, nothing noisy.</p><a className="connect-button" href="/api/auth/google"><span className="google">G</span> Add a Google Drive <b>→</b></a><small>Read-only access · Your files stay yours</small></section><footer className="landing-footer"><span>ARCHIVE / 2026</span><span>PRIVATE BY DESIGN</span></footer></main>;
  if (screen === "files" && selected) return <main className="files-screen"><header className="files-topbar"><button className="brand-button" onClick={() => setScreen("home")}><Mark small /> archive</button><div className="top-account"><Avatar account={selected} /><span>{selected.name || selected.email}</span></div></header><section className="files-body"><div className="files-heading"><div><button className="return" onClick={() => setScreen("home")}>← Overview</button><h1>{path.at(-1)?.name}</h1><p>{selected.email}</p></div><label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this folder" /></label></div><nav className="trail" aria-label="Folder navigation">{path.map((crumb, index) => <span key={`${crumb.name}-${index}`}><button onClick={() => visit(index)} aria-current={index === path.length - 1 ? "page" : undefined}>{crumb.name}</button>{index < path.length - 1 && <i>›</i>}</span>)}</nav><div className="file-list"><div className="file-row file-label"><span>Name</span><span>Last modified</span><span>Size</span><span /></div>{visible.map((item) => isFolder(item) ? <button className="file-row folder-row" key={item.id} onClick={() => openFolder(item)}><span className="item-name"><FileGlyph item={item} />{item.name}</span><span>{date(item.modifiedTime)}</span><span>—</span><span>›</span></button> : <div className="file-row" key={item.id}><span className="item-name"><FileGlyph item={item} />{item.name}</span><span>{date(item.modifiedTime)}</span><span>{bytes(item.size)}</span><span /></div>)}{!visible.length && <p className="no-files">No matching files in this folder.</p>}</div></section></main>;
  return <main className="dashboard"><header className="dashboard-topbar"><a className="wordmark" href="/"><Mark small /> archive</a><a className="add-link" href="/api/auth/google">+ Add Drive</a></header><section className="dashboard-body"><div className="summary"><div><p className="eyebrow">ALL ACCOUNTS</p><h1>Your storage,<br />in perspective.</h1></div><div className="total"><span>USED ACROSS {accounts.length} {accounts.length === 1 ? "DRIVE" : "DRIVES"}</span><strong>{bytes(used)}</strong><small>of {bytes(capacity)}</small></div></div><div className="total-bar"><i style={{ width: `${percent(used, capacity)}%` }} /></div><section className="drives"><div className="section-header"><h2>Connected drives</h2><span>{accounts.length} active</span></div><div className="drive-list">{accounts.map((account) => { const amount = percent(account.used, account.limit); return <article className="drive-card" key={account.id}><button className="drive-main" onClick={() => browse(account)}><Avatar account={account} /><div className="drive-title"><strong>{account.name || account.email.split("@")[0]}</strong><span>{account.email}</span></div><span className="browse-arrow">↗</span><div className="usage"><div><b>{bytes(account.used)}</b><span> of {bytes(account.limit)} used</span><em>{amount}%</em></div><div className="usage-bar"><i className={amount > 85 ? "warm" : ""} style={{ width: `${amount}%` }} /></div></div><p>{account.files.toLocaleString()} items in Drive</p></button><button className="remove" onClick={() => setPendingRemoval(account)} disabled={removing === account.id}>{removing === account.id ? "Removing…" : "Remove from tracking"}</button></article>; })}</div></section></section>{pendingRemoval && <div className="modal-backdrop" role="presentation" onMouseDown={() => !removing && setPendingRemoval(undefined)}><section className="remove-modal" role="dialog" aria-modal="true" aria-labelledby="remove-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setPendingRemoval(undefined)} disabled={Boolean(removing)}>×</button><span className="remove-icon">−</span><p className="eyebrow">REMOVE FROM ARCHIVE</p><h2 id="remove-title">Stop tracking this Drive?</h2><p>Files will stay in Google Drive. You can reconnect this account whenever you like.</p><div className="removal-account"><Avatar account={pendingRemoval} /><span><b>{pendingRemoval.name || pendingRemoval.email.split("@")[0]}</b><small>{pendingRemoval.email}</small></span></div><div className="modal-actions"><button className="cancel-remove" onClick={() => setPendingRemoval(undefined)} disabled={Boolean(removing)}>Keep tracking</button><button className="confirm-remove" onClick={() => void remove(pendingRemoval)} disabled={Boolean(removing)}>{removing ? "Removing…" : "Remove Drive"}</button></div></section></div>}</main>;
}
