import type { NewsItem } from '@/data/types';

/**
 * Получить все новости
 * @returns {NewsItem[]} Массив новостей
 */
export function getAllNews(): NewsItem[] {
  const data: NewsItem[] = require('@/data/news.json');
  return data;
}

/**
 * Найти новость по ID
 * @param {string} id - ID новости (строка, так как из параметров маршрута)
 * @returns {NewsItem | null} Найденная новость или null
 */
export function getNewsById(id: string): NewsItem | null {
  const data = require('@/data/news.json');
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) return null;

  return data.find((item: NewsItem) => item.id === numericId) || null;
}