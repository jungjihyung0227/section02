//url parameter 동적 경로 같은 페이지

// [id]는 하나의 url parameter를 받을 수 있음
// /search/1 이런식으로 하나의 url parameter를 받을 수 있음

// catch all segment
// [...id] 는 여러개의 url parameter를 받을 수 있음
// /search/1/2/3/4/5 이런식으로 여러개의 url parameter를 받을 수 있음

// optional catch all segment
// [[...id]]는 여러개의 url parameter를 받을 수 있음 / url parameter가 없는 경우 undefined로 나옴
// import { useRouter } from "next/router";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-books";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } }, // 반드시 id는 문자열로 들어감
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true, // false로 설정하면 없는 id로 접근할 경우 404 에러 페이지로 이동함.
    /**
     * false : 404 Not found
     * blocking: SSR 방식
     * true : SSR 방식 + 데이터가 없는 콜백 상태의 페이지부터 반환
     */
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true, // 404 페이지로 이동함.
    };
  }
  return {
    props: {
      book,
    },
  };
};
export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>; // fallback이 true일 때 보여줄 컴포넌트
  }

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
