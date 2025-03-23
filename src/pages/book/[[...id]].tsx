//url parameter 동적 경로 같은 페이지

// [id]는 하나의 url parameter를 받을 수 있음
// /search/1 이런식으로 하나의 url parameter를 받을 수 있음

// catch all segment
// [...id] 는 여러개의 url parameter를 받을 수 있음
// /search/1/2/3/4/5 이런식으로 여러개의 url parameter를 받을 수 있음

// optional catch all segment
// [[...id]]는 여러개의 url parameter를 받을 수 있음 / url parameter가 없는 경우 undefined로 나옴
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return <h1>{id}</h1>;
}
/**
 * Pre-Fetching(사전 로딩)
 * 이동할 예정이 있는 페이지를 사전에 로딩하는 기능
 * 빠른 페이지 이동을 위해 사용
 *
 */
