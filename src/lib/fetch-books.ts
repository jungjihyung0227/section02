import { BookData } from "../../types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = "http://localhost:12345/book";

  if (q) {
    url += `/search?q=${q}`;
    console.log(url);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}
