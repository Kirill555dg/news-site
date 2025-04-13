// app/page.tsx
import { getAllNews } from "@/utils/newsApi";
import NewsList from "@/components/NewsList";
import styles from "./page.module.css";

export default function Home() {
  const news = getAllNews();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Новости</h1>
      <NewsList news={news} />
    </div>
  );
}
