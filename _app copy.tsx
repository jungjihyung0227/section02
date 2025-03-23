import GlobalLayout from "@/component/global-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
// 모든 페이지에 사용되기 때문에 글로벌 css이 사용 가능함.
export default function App({ Component, pageProps }: AppProps) {
  // 네비게이팅
  const router = useRouter();
  const onClickButton = () => {
    router.push("/test");
    // replace는 뒤로가기 했을때 이전 페이지로 이동하지 않음
  };

  useEffect(() => {
    // Link만 사전 로딩이 되므로 프로그래밍적 페이지 이동은 아래처럼 사전 로딩을 해줘야함
    router.prefetch("/test");
  }, []);

  return (
    <>
      <header>
        {/* 프로그래매틱한 페이지 이동  */}
        <Link href="/">index</Link> &nbsp;
        <Link href="/search" prefetch={false}>
          search
        </Link>{" "}
        &nbsp;
        <Link href="/book/1">book</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지 이동</button>
        </div>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>footer</footer>
    </>
  );
}
