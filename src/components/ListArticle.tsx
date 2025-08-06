import api from "@/lib/api";
import { ArticlesResponse } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Typography, List, Spin } from "antd";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  filter?: Record<string, string | undefined>;
  source?: "everything" | "top-headlines";
  title: string;
  pageSize?: number;
  noLoadMore?: boolean;
}

export default function ListArticle({
  filter,
  source = "everything",
  title,
  pageSize = 20,
  noLoadMore,
}: Props) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["get-articles", filter, pageSize],
      queryFn: ({ pageParam }) => {
        return api.get<ArticlesResponse>(`/v2/${source}`, {
          params: {
            language: "en",
            page: pageParam,
            pageSize,
            ...(filter ?? {}),
          },
        });
      },
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const allTotal = lastPage.data.totalResults;
        const currentTotal = allPages.reduce(
          (acc, page) => acc + page.data.articles.length,
          0
        );

        if (currentTotal >= allTotal || noLoadMore) {
          return null;
        }

        return lastPageParam + 1;
      },
    });

  const totalArticles = data?.pages?.[0].data.totalResults ?? 0;
  const articles = data?.pages.flatMap((page) => page.data.articles);

  return (
    <div>
      <Typography.Title level={3}>{title}</Typography.Title>
      <InfiniteScroll
        dataLength={totalArticles}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={isLoading || isFetchingNextPage ? <Spin /> : <></>}
        scrollableTarget="body"
        style={{ overflowX: "hidden" }}
      >
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 6 }}
          loading={isLoading}
          dataSource={articles}
          renderItem={(item) => (
            <List.Item>
              <Link href={`/${item.title}?source=${source}`}>
                <ArticleCard article={item} />
              </Link>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
}
