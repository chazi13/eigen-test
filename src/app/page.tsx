"use client";

import AppBar from "@/components/Appbar";
import ArticleCard from "@/components/ArticleCard";
import api from "@/lib/api";
import { ArticlesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { List, Spin, Typography } from "antd";
import { useSearchParams } from "next/navigation";

export default function ArticlesPage() {
  const params = useSearchParams();

  const category = params.get("category") ?? "";
  const query = params.get("query") ?? "";

  const { data, isLoading } = useQuery({
    queryKey: ["get-articles", category, query],
    queryFn: () => {
      return api.get<ArticlesResponse>("/v2/top-headlines", {
        params: { q: query, category, language: "en" },
      });
    },
  });

  const articles = data?.data.articles ?? [];

  return (
    <>
      <AppBar />
      <div style={{ padding: 24, paddingTop: 12 }}>
        <Typography.Title level={3}>Articles</Typography.Title>
        {isLoading ? (
          <Spin />
        ) : (
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 6 }}
            dataSource={articles}
            renderItem={(item) => (
              <List.Item>
                <ArticleCard article={item} />
              </List.Item>
            )}
          />
        )}
      </div>
    </>
  );
}
