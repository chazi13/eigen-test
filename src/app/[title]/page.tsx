/* eslint-disable @next/next/no-img-element */
"use client";

import ArticleAuthor from "@/components/ArticleAuthor";
import ArticleCard from "@/components/ArticleCard";
import api from "@/lib/api";
import { ArticlesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Col, List, Row, Spin, Typography } from "antd";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function DetailArticlePage() {
  const { title } = useParams();
  const params = useSearchParams();

  const source = params.get("source") ?? "top-headlines";

  const decodedTitle = decodeURIComponent(`${title}`);

  const { data: detailResponse, isLoading: detailLoading } = useQuery({
    enabled: !!decodedTitle,
    queryKey: ["get-articles", decodedTitle, source],
    queryFn: () => {
      return api.get<ArticlesResponse>(`/v2/${source}`, {
        params: { q: decodedTitle, searchIn: "title", language: "en" },
      });
    },
  });

  const article = detailResponse?.data?.articles?.[0];

  const { data: otherArticleResponse, isLoading: otherArticleLoading } =
    useQuery({
      enabled: !!article,
      queryKey: ["get-other-articles"],
      queryFn: () => {
        return api.get<ArticlesResponse>("/v2/everything", {
          params: {
            language: "en",
            sources: article?.source?.id,
            pageSize: 8,
            page: 1,
          },
        });
      },
    });

  const articles = otherArticleResponse?.data.articles ?? [];

  return (
    <div style={{ padding: 24 }}>
      {detailLoading ? (
        <Spin />
      ) : article ? (
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <Typography.Title level={2}>{article.title}</Typography.Title>
            <div style={{ marginBottom: 24 }}>
              <ArticleAuthor
                author={article.author}
                publishedAt={article.publishedAt}
              />
            </div>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{ width: "80%", objectFit: "cover" }}
              />
            )}
            <Typography.Paragraph style={{ marginTop: 24 }}>
              {article.content}
            </Typography.Paragraph>
          </Col>
          <Col span={24}>
            <div style={{ paddingTop: 20 }}>
              <Typography.Title level={3}>Other Articles</Typography.Title>
              <List
                loading={otherArticleLoading}
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 2,
                  lg: 3,
                  xl: 4,
                  xxl: 6,
                }}
                dataSource={articles}
                renderItem={(item) => (
                  <List.Item>
                    <Link href={`/${item.title}?source=everything`}>
                      <ArticleCard article={item} />
                    </Link>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
      ) : (
        <Typography.Text type="danger">Article not found.</Typography.Text>
      )}
    </div>
  );
}
