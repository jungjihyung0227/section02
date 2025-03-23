import { useRouter } from "next/router";

// 페이지 라우팅
export default function Page() {
  const router = useRouter();
  console.log(router.query);
  return <h1>setting</h1>;
}
// 쿼리스트링이 바뀔때마다 렌더링함.
