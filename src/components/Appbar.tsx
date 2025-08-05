"use client";

import {
  Menu,
  Input,
  Row,
  Col,
  Typography,
  AutoComplete,
  AutoCompleteProps,
} from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ArticlesResponse } from "@/types";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "sciences",
  "ports",
  "technology",
];

export default function AppBar() {
  const router = useRouter();
  const params = useSearchParams();

  const category = params.get("category") ?? "";

  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useState("");

  useDebounce(() => setSearchParams(searchInput), 100, [searchInput]);

  const { data } = useQuery({
    enabled: !!searchParams,
    queryKey: ["search-articles", searchParams],
    queryFn: () => {
      return api.get<ArticlesResponse>("/v2/top-headlines", {
        params: { q: searchParams, language: "en" },
      });
    },
  });

  const options: AutoCompleteProps["options"] = (data?.data.articles ?? []).map(
    (article) => ({
      title: article.title,
      label: article.title,
      value: article.title,
    })
  );

  const handleEnterSearch = () => {
    router.push(`/?query=${searchInput}`);
  };

  return (
    <div style={{ padding: "8px 0" }}>
      <Row align="middle" justify="space-between">
        <Col style={{ paddingLeft: 24 }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            <Link href="/">Eigen3 News</Link>
          </Typography.Title>
        </Col>
        <Col flex="auto" style={{ paddingLeft: 32, paddingRight: 32 }}>
          <AutoComplete
            popupMatchSelectWidth={252}
            style={{ width: 300 }}
            options={options}
            onSelect={console.log}
            onSearch={setSearchInput}
            allowClear={false}
          >
            <Input.Search
              size="large"
              placeholder="input here"
              enterButton
              onPressEnter={handleEnterSearch}
            />
          </AutoComplete>
        </Col>
        <Col span={24}>
          <Menu
            mode="horizontal"
            style={{
              borderBottom: "none",
              marginTop: 8,
              fontWeight: 500,
              paddingLeft: 10,
            }}
            selectedKeys={[category]}
          >
            {categories.map((cat) => (
              <Menu.Item key={cat}>
                <Link href={`/?category=${cat}`}>{cat.toUpperCase()}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
