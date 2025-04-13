"use client";

import { useEffect } from "react";
import { NewsItem } from "@/data/types";
import styles from "./styles.module.css";

interface ModalProps {
  news: NewsItem;
  onClose: () => void;
}

export default function Modal({ news, onClose }: ModalProps) {
  // Блокировка скролла при открытии
  useEffect(() => {
    const body = document.body;
    body.classList.add("locked");
    return () => {
      body.classList.remove("locked");
    };
  }, []);

  const firstPhoto = news.attachments.find((a) => a.type === "PHOTO")?.image;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {/* Заголовок и кнопка закрытия */}
        <div className={styles.header}>
          <h2 className={styles.title}>{news.text.split("\n")[0]}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Первое изображение */}
        {firstPhoto?.src && (
          <img
            src={firstPhoto.src}
            alt="Основное изображение"
            className={styles.mainImage}
            style={{
              maxWidth: "100%",
              height: "auto",
              aspectRatio: `${firstPhoto.width}/${firstPhoto.height}`,
            }}
          />
        )}

        {/* Текст с сохранением переносов */}
        <div className={styles.textContent}>
          {news.text.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* Ссылка на полную страницу */}
        <div className={styles.footer}>
          <button
            onClick={() => {
              window.location.href = `/news/${news.id}`;
            }}
            className={styles.fullLink}
          >
            Открыть новость →
          </button>
        </div>
      </div>
    </div>
  );
}
