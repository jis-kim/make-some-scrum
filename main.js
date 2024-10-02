/**
 * 주 1회 수요일에 실행되는 스크립트.
 * 만약 공휴일이면 스크럼을 생성하지 않음.
 */
import { getHoliday } from './holiday.js';
import { createNotionPage } from './notion.js';

import dotenv from 'dotenv';

dotenv.config();

// 공휴일 API 받아오기
const holidays = await getHoliday();
console.log(holidays);
await createNotionPage(holidays);

// holiday 제외하고 월화수목금 10:30에 스크럼 생성
// 현재 날짜가 공휴일이면 스크럼 생성하지 않음
