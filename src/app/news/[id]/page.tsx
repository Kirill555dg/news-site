import { notFound } from "next/navigation";
import { getNewsById } from "@/utils/newsApi";
import Link from "next/link";
import styles from "./page.module.css";
import { use } from "react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const news = await import("@/data/news.json");
  return news.default.map((item) => ({ id: item.id.toString() }));
}

export default function NewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const news = getNewsById(id);
  if (!news) notFound();

  // Форматирование даты на сервере
  const formattedDate = new Date(news.date * 1000).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Moscow",
  });

  const photos = news.attachments.filter((a) => a.type === "PHOTO");
  const links = news.attachments.filter((a) => a.type === "LINK");

  return (
    <div className={styles.container}>
      {/* Кнопка возврата */}
      <Link href="/" className={styles.backLink}>
        ← Все новости
      </Link>

      {/* Заголовок */}
      <h1 className={styles.title}>{news.text.split("\n")[0]}</h1>

      {/* Мета-информация */}
      <div className={styles.meta}>
        <span className={styles.type}>{news.type.replace("Вика_", "")}</span>
        <time className={styles.date}>{formattedDate}</time>
      </div>

      {/* Галерея изображений */}
      {photos.length > 0 && (
        <div className={styles.gallery}>
          {photos.map((attachment, i) => (
            <img
              key={i}
              src={attachment.image!.src}
              alt={`Изображение ${i + 1}`}
              className={styles.image}
            />
          ))}
        </div>
      )}

      {/* Основной текст */}
      <div className={styles.content}>
        {news.text.split("\n").map((line, i) => (
          <p key={i} className={styles.paragraph}>
            {line}
          </p>
        ))}
      </div>

      {/* Ссылки */}
      {links.length > 0 && (
        <div className={styles.links}>
          <h2 className={styles.sectionTitle}>Полезные ссылки</h2>
          {links.map((link, i) => (
            <a key={i} href={link.link} className={styles.link}>
              <span className={styles.linkTitle}>{link.titleLink}</span>
              {link.description && (
                <span className={styles.linkDescription}>
                  {link.description}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
