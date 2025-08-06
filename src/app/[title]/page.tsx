/* eslint-disable @next/next/no-img-element */
"use client";

import ArticleAuthor from "@/components/ArticleAuthor";
import ListArticle from "@/components/ListArticle";
import api from "@/lib/api";
import { ArticlesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Col, Row, Spin, Typography } from "antd";
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
  const otherArticleFilter = {
    language: "en",
    sources: article?.source?.id,
  };

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
            <ListArticle
              noLoadMore
              title="Other Articles"
              filter={otherArticleFilter}
              source="everything"
              pageSize={8}
            />
          </Col>
        </Row>
      ) : (
        <Typography.Text type="danger">Article not found.</Typography.Text>
      )}
    </div>
  );
}
