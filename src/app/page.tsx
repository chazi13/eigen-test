"use client";

import ListArticle from "@/components/ListArticle";
import { useSearchParams } from "next/navigation";

export default function ArticlesPage() {
  const params = useSearchParams();

  const category = params.get("category") ?? "";
  const query = params.get("query") ?? "";
  const filter: Record<string, string> = { category, q: query };

  return (
    <div style={{ padding: 24, paddingTop: 12 }}>
      <ListArticle
        title="Top Articles"
        filter={filter}
        source="top-headlines"
      />
    </div>
  );
}
