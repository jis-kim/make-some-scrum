import { Client } from '@notionhq/client';
import { PageBuilder } from './page-builder.js';

const createPageArray = (holidays, databaseId) => {
  const today = new Date();

  // 다음 주의 월요일부터 금요일까지 스크럼 생성
  const pageArray = [];

  // 현재 날짜를 기준으로 다음 주 월요일을 계산
  const daysUntilNextMonday = (1 + 7 - today.getDay()) % 7 || 7; // 다음 월요일까지 남은 일수

  // 다음 주 월요일 날짜 계산
  const startDay = new Date(
    today.getTime() + daysUntilNextMonday * 24 * 60 * 60 * 1000
  );

  console.log('startDay:: ', startDay);

  for (let i = 0; i < 5; i++) {
    const date = new Date(startDay.getTime() + 24 * 60 * 60 * 1000 * i);
    const dateDate = date.getDate();
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    const isHoliday = holidays.find(
      (holiday) =>
        holiday.getFullYear() === dateYear &&
        holiday.getMonth() === dateMonth &&
        holiday.getDate() === dateDate
    );

    // 휴일이 아니면
    if (isHoliday === undefined) {
      date.setUTCHours(10, 30, 0, 0);
      console.log(date);
      pageArray.push(
        new PageBuilder(databaseId)
          .setTitle('데일리 스크럼')
          .setDate(date)
          .setIcon('💫')
          .addParagraph('notion API로 만들어진 페이지입니다.')
          .build()
      );
    }
  }

  return pageArray;
};

export const createNotionPage = async (holidays) => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const pageArray = createPageArray(holidays, databaseId);

  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  const promises = pageArray.map((page) => {
    notion.pages.create(page);
  });

  await Promise.all(promises);
};
