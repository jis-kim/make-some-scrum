import { getHoliday } from './holiday.js';

import dotenv from 'dotenv';

dotenv.config();

// 공휴일 API 받아오기
const holidays = await getHoliday();
console.log(holidays);
process.exit(0);

// holiday 제외하고 월화수목금 10:30에 스크럼 생성
// 현재 날짜가 공휴일이면 스크럼 생성하지 않음
