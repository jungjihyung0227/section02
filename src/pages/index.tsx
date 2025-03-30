import React from "react";
import SearchableLayout from "@/component/searchble-layout";
import style from "./index.module.css";

import BookItem from "@/component/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
// 페이지별로 css가 겹치는 걸 방지하기 위해 css module을 사용함
// css module은 css 파일을 import하면 객체로 변환되어 사용됨

// 서버사이드 렌더링을 사용하기 위해 getServerSideProps를 사용함
export const getServerSideProps = async () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수.
  // 서버에서 실행되기 때문에 브라우저 콘솔에서는 출력되지 않음.
  // window.location;
  console.log("서버에서 실행됨");
  // 병렬 처리로 변경
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);
  // // 직렬 변경
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();

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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
