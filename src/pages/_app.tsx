import GlobalLayout from "@/component/global-layout";
import SearchableLayout from "@/component/searchble-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// 모든 페이지에 사용되기 때문에 글로벌 css이 사용 가능함.
export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout;
  return (
    <>
      <GlobalLayout>
        <SearchableLayout>
          {getLayout(<Component {...pageProps} />)}
        </SearchableLayout>
      </GlobalLayout>
    </>
  );
}
