import React from "react";
import SearchableLayout from "@/component/searchble-layout";
import style from "./index.module.css";

import BookItem from "@/component/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getStaticProps = async () => {
  // 빌드 시점에 한번만 실행됨.
  // 서버에서만 실행됨. 브라우저에서는 실행되지 않음.
  console.log("서버에서 실행됨");
  // 병렬 처리로 변경
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

/**
 * 컴포넌트는 서버에서 한번 실행되고,
 * 브라우저에서 자바 번들링 상태로 하이드레이션 과정이 진행될 때 한번 더 실행됨.
 */
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // 한번은 서버에서 실행되기 때문에 window.location이 undefined임 에러남.
  // window.location;
  console.log(allBooks); // hello

  // 브라우저에서만 실행되고 싶으면 useEffect를 사용해야함. 다른 방법도 있음.
  // useEffect(() => {
  //   console.log(window.location);
  // }, []);
  // useEffect는 컴포넌트가 마운트될 때 실행됨. 서버에서 실행되지 않음.
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
