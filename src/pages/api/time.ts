import type { NextApiRequest, NextApiResponse } from "next";

// API 라우트
// API 라우트는 Next.js에서 제공하는 기능으로, 서버리스 함수를 만들 수 있음
// API 라우트는 src/pages/api 디렉토리에 파일을 생성하면 됨
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ time: new Date().toLocaleString() });
}
