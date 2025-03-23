import React from "react";
import SearchableLayout from "@/component/searchble-layout";
// 페이지별로 css가 겹치는 걸 방지하기 위해 css module을 사용함
// css module은 css 파일을 import하면 객체로 변환되어 사용됨
export default function Home() {
  return (
    <>
      <h1>인덱스</h1>
    </>
  );
}

//객
Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
