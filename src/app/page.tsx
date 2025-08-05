/* eslint-disable @next/next/no-img-element */
"use client";

import AppBar from "@/components/Appbar";
import api from "@/lib/api";
import { ArticlesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { List, Card, Spin, Typography } from "antd";
import { format } from "date-fns";
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
            grid={{ gutter: 16, column: 4 }}
            dataSource={articles}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={item.title}
                  cover={
                    item.urlToImage ? (
                      <img
                        src={item.urlToImage}
                        alt={item.title}
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    ) : undefined
                  }
                  hoverable
                >
                  <div style={{ marginBottom: 8 }}>
                    <Typography.Text type="secondary">
                      {format(item.publishedAt, "PP")}
                    </Typography.Text>
                    {item.author && (
                      <>
                        <Typography.Text style={{ margin: "0px 6px" }}>
                          |
                        </Typography.Text>
                        <Typography.Text type="secondary">
                          {item.author}
                        </Typography.Text>
                      </>
                    )}
                  </div>
                  <Typography.Paragraph>
                    {item.description}
                  </Typography.Paragraph>
                </Card>
              </List.Item>
            )}
          />
        )}
      </div>
    </>
  );
}
