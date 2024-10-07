import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: true,
  parseTagValue: false,
});

const url =
  'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';

const getNextMonthHoliday = async (date, items) => {
  const key = process.env.HOLIDAY_API_KEY;
  if (date.getDate() < 22) {
    return;
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  if (month === 12) {
    year += 1;
    month = 1;
  } else {
    month += 1;
  }

  const api = `${url}?solYear=${year}&solMonth=${month}&ServiceKey=${key}`;
  const response = await fetch(api);
  const xml = await response.text();
  const array = parser.parse(xml).response.body?.items?.item;
  if (array !== undefined && array.length > 0) {
    items.push(array);
  }
};

export const getHoliday = async () => {
  const date = new Date();
  const key = process.env.HOLIDAY_API_KEY;

  // UTC 시간에서 9시간 더해서 KST로 변환
  // 갑자기.. 난 15일에 할건데 굳이 이걸.............해야 하나? 하는 생가ㄱ이..
  //date.setHours(date.getUTCHours() + 9); // UTC 기준으로 9시간 더하기 (KST = UTC + 9)

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // 만약에 오늘 날짜가 22일 이상이면 다음 달의 공휴일도 가져온다.
  // 22, 23, 24, 25토, 26일, 27월, 28화, 29수, 30목, 31금, 30일이면 목요일일수도..

  const api = `${url}?solYear=${year}&solMonth=${month}&ServiceKey=${key}`;

  // API 호출
  const response = await fetch(api);
  const xml = await response.text();

  console.log('공휴일 정보: ', xml);

  // XML 파싱
  /**
 * {
  '?xml': '',
  response: {
    header: { resultCode: '00', resultMsg: 'NORMAL SERVICE.' },
    body: { items: [Object], numOfRows: '10', pageNo: '1', totalCount: '3' }
  }

  }
{
  item: [
    {
      dateKind: '01',
      dateName: '임시공휴일',
      isHoliday: 'Y',
      locdate: '20241001',
      seq: '2'
    },
    ...
  ]
}
}
 */

  const items = [];
  const array = parser.parse(xml).response.body?.items?.item;
  if (array !== undefined && array.length > 0) {
    items.push(...array);
  }
  await getNextMonthHoliday(date, items);

  return items.map((item) => {
    const date = item.locdate;
    return new Date(
      `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`
    );
  });
};
