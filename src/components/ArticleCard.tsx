/* eslint-disable @next/next/no-img-element */
import { Article } from "@/types";
import { Card, Typography } from "antd";
import ArticleAuthor from "./ArticleAuthor";

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  return (
    <Card
      cover={
        article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            style={{ height: 200, width: "100%", objectFit: "cover" }}
          />
        ) : undefined
      }
      hoverable
    >
      <Card.Meta
        title={article.title}
        description={
          <>
            <ArticleAuthor
              author={article.author}
              publishedAt={article.publishedAt}
            />
            <Typography.Paragraph>{article.description}</Typography.Paragraph>
          </>
        }
      />
    </Card>
  );
}
