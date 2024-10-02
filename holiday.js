import { XMLParser } from 'fast-xml-parser';

export const getHoliday = async () => {
  const date = new Date();

  // UTC 시간에서 9시간 더해서 KST로 변환
  date.setHours(date.getUTCHours() + 9); // UTC 기준으로 9시간 더하기 (KST = UTC + 9)

  const key = process.env.HOLIDAY_API_KEY;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const api = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&solMonth=${month}&ServiceKey=${key}`;

  console.log(api);

  // API 호출
  const response = await fetch(api);
  const xml = await response.text();

  console.log(xml);

  // XML 파싱
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: false,
  });
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

  return parser.parse(xml).response.body.items.item.map((item) => {
    return {
      date: item.locdate,
    };
  });
};
