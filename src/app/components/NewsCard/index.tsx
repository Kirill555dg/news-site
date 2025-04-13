import Link from "next/link";
import { NewsItem } from "@/data/types";
import styles from "./styles.module.css";

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/news/${news.id}`} className={styles.card} scroll={false}>
      {/* Тип новости */}
      <div className={styles.type}>{news.type.replace("Вика_", "")}</div>

      {/* Заголовок (первая строка текста) */}
      <h3 className={styles.title}>{news.text.split("\n")[0]}</h3>

      {/* Дата */}
      <time className={styles.date}>
        {new Date(news.date * 1000).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </time>
    </Link>
  );
}
