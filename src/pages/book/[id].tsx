//url parameter 동적 경로 같은 페이지

// [id]는 하나의 url parameter를 받을 수 있음
// /search/1 이런식으로 하나의 url parameter를 받을 수 있음

// catch all segment
// [...id] 는 여러개의 url parameter를 받을 수 있음
// /search/1/2/3/4/5 이런식으로 여러개의 url parameter를 받을 수 있음

// optional catch all segment
// [[...id]]는 여러개의 url parameter를 받을 수 있음 / url parameter가 없는 경우 undefined로 나옴
// import { useRouter } from "next/router";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;

  const book = await fetchOneBook(Number(id));
  return {
    props: {
      book,
    },
  };
};
export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) return "문제가 발생했습니다. 다시 시도하세요.";
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <div className={style.container} key={id}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
/**
 * Pre-Fetching(사전 로딩)
 * 이동할 예정이 있는 페이지를 사전에 로딩하는 기능
 * 빠른 페이지 이동을 위해 사용
 *
 */
