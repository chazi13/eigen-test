/* eslint-disable @next/next/no-img-element */
import { Article } from "@/types";
import { Card, Typography } from "antd";
import { format } from "date-fns";

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
            <div style={{ marginBottom: 8 }}>
              <Typography.Text type="secondary">
                {format(article.publishedAt, "PP")}
              </Typography.Text>
              {article.author && (
                <>
                  <Typography.Text style={{ margin: "0px 6px" }}>
                    |
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    {article.author.split(",")?.[0]}
                  </Typography.Text>
                </>
              )}
            </div>
            <Typography.Paragraph>{article.description}</Typography.Paragraph>
          </>
        }
      />
    </Card>
  );
}
