"use client";

import { useEffect, useState } from "react";

const News = () => {
  // 儲存新聞
  const [news, setNews] = useState([]);
  // 管理新聞渲染數量
  const [articlesNum, SetArticlesNum] = useState(3);

  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);

  return (
    <div className="space-y-3 pt-2 text-gray-700 rounded-xl bg-neutral-100">
      {/* 可能需要跳脫字元？ */}
      <h4 className="px-4 text-lg font-bold">What's happening</h4>
      {news.slice(0, articlesNum).map((article) => (
        <div key={article.url}>
          <a href={article.url} target="_blank">
            <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-neutral-200 transition-all duration-200 ease-out">
              <div className="space-y-0.5">
                <h6 className="font-semibold">{article.title}</h6>
                <p className="text-sm font-medium text-gray-500">
                  Souce: {article.source.name}
                </p>
              </div>
              <img
                src={article.urlToImage}
                width={160}
                className="rounded-lg"
              />
            </div>
          </a>
        </div>
      ))}
      <button
        onClick={() => SetArticlesNum(articlesNum + 3)}
        className="text-sm text-blue-400 pb-3 pl-4 hover:text-blue-500"
      >
        Load more
      </button>
    </div>
  );
};

export default News;
