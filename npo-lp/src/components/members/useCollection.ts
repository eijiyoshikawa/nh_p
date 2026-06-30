"use client";

import { useCallback, useEffect, useState } from "react";

export type CollectionState<T> = {
  items: T[];
  loading: boolean;
  configured: boolean;
  error: string | null;
  add: (data: Record<string, unknown>) => Promise<void>;
  patch: (id: string, p: Record<string, unknown>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  reload: () => Promise<void>;
};

export function useCollection<T extends { id: string }>(
  collection: string
): CollectionState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/store/${collection}`, { cache: "no-store" });
      const data = (await res.json()) as {
        ok: boolean;
        configured?: boolean;
        items?: T[];
        error?: string;
      };
      setConfigured(data.configured !== false);
      setItems(data.items ?? []);
      if (!data.ok && data.error && data.configured !== false) {
        setError(data.error);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    reload();
  }, [reload]);

  const add = useCallback(
    async (data: Record<string, unknown>) => {
      const res = await fetch(`/api/store/${collection}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = (await res.json()) as { ok: boolean; error?: string };
      if (!j.ok) throw new Error(j.error ?? "追加に失敗しました");
      await reload();
    },
    [collection, reload]
  );

  const patch = useCallback(
    async (id: string, p: Record<string, unknown>) => {
      const res = await fetch(`/api/store/${collection}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, patch: p }),
      });
      const j = (await res.json()) as { ok: boolean; error?: string };
      if (!j.ok) throw new Error(j.error ?? "更新に失敗しました");
      await reload();
    },
    [collection, reload]
  );

  const remove = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/store/${collection}?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const j = (await res.json()) as { ok: boolean; error?: string };
      if (!j.ok) throw new Error(j.error ?? "削除に失敗しました");
      await reload();
    },
    [collection, reload]
  );

  return { items, loading, configured, error, add, patch, remove, reload };
}
