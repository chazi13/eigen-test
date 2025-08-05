import { Typography } from "antd";
import { format } from "date-fns";

interface Props {
  author?: string;
  publishedAt: string;
}

export default function ArticleAuthor({ author, publishedAt }: Props) {
  return (
    <div style={{ marginBottom: 8 }}>
      <Typography.Text type="secondary">
        {format(publishedAt, "PP")}
      </Typography.Text>
      {author && (
        <>
          <Typography.Text style={{ margin: "0px 6px" }}>|</Typography.Text>
          <Typography.Text type="secondary">
            {author.split(",")?.[0]}
          </Typography.Text>
        </>
      )}
    </div>
  );
}
