"use client";

import { useRouter } from "next/navigation";
import { getNewsById } from "@/utils/newsApi";
import Modal from "@/components/Modal";
import { use } from "react";

export default function NewsModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const news = getNewsById(id);

  if (!news) return null;

  const handleClose = () => router.back();
  return <Modal news={news} onClose={handleClose} />;
}
