import SearchableLayout from "@/component/searchble-layout";
import { useRouter } from "next/router";

import BookItem from "@/component/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const books = await fetchBooks(q as string);
  return {
    props: {
      books,
    },
  };
};
// 페이지 라우팅
export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
// 쿼리스트링이 바뀔때마다 렌더링함.

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
