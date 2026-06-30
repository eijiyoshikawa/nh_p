"use client";

import { useState } from "react";
import { photoUrl } from "@/lib/members";

// プロフィール写真を表示。Drive画像が読めない場合は動物絵文字に
// フォールバックする。写真は Drive 側で「リンクを知っている全員が閲覧可」
// に設定されている必要がある。
export function MemberAvatar({
  photoId,
  emoji,
  name,
  size = "md",
}: {
  photoId?: string;
  emoji: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const [errored, setErrored] = useState(false);
  const url = photoUrl(photoId, size === "xl" ? 600 : 400);

  const box =
    size === "sm"
      ? "h-12 w-12 text-2xl"
      : size === "md"
      ? "h-16 w-16 text-4xl"
      : size === "lg"
      ? "h-20 w-20 text-5xl"
      : "h-28 w-28 text-7xl";

  const radius = size === "xl" ? "rounded-3xl" : "rounded-2xl";

  if (url && !errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={`${name} のプロフィール写真`}
        onError={() => setErrored(true)}
        className={`${box} ${radius} shrink-0 border border-green-100 object-cover`}
        loading="lazy"
      />
    );
  }

  return (
    <span
      aria-hidden
      className={`${box} ${radius} flex shrink-0 items-center justify-center bg-green-50`}
    >
      {emoji}
    </span>
  );
}
