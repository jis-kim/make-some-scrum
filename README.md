# make-some-scrum

공휴일과 주말을 제외하고 매일 10:30분에 진행되는 스크럼 일정을 생성합니다.

## 사용 기술

- Node.js
- [Notion SDK](https://github.com/makenotion/notion-sdk-js)
- [Railway](https://railway.app/) (배포)
  - cronjob을 이용하여 매주 수요일 15:00시(UTC)에 스크립트를 실행합니다.
