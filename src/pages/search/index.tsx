import SearchableLayout from "@/component/searchble-layout";
import { useRouter } from "next/router";

import BookItem from "@/component/book-item";

import fetchBooks from "@/lib/fetch-books";
import { useEffect, useState } from "react";
import { BookData } from "../../../types";

// export const getServerSideProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: {
//       books,
//     },
//   };
// };
// 페이지 라우팅
export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
    return () => {};
  }, [q]);

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
