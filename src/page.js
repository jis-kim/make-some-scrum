export class Page {
  constructor(databaseId) {
    this.parent = { database_id: databaseId };
    this.properties = {};
    this.children = [];
    this.icon = null;
  }

  addProperty(name, value) {
    this.properties[name] = value;
    return this;
  }

  addChildBlock(block) {
    this.children.push(block);
    return this;
  }

  setIcon(emoji) {
    this.icon = { emoji };
    return this;
  }
}

//{
//  parent: { database_id },
//  icon: {
//    emoji: '💫',
//  },
//  properties: {
//    // database의 속성과 일치
//    Name: {
//      title: [
//        {
//          text: {
//            content: '데일리 스크럼',
//          },
//        },
//      ],
//    },
//    Date: {
//      date: {
//        start: new Date(),
//        time_zone: 'Asia/Seoul',
//      },
//    },
//  },
//  children: [
//    {
//      object: 'block',
//      type: 'paragraph',
//      paragraph: {
//        rich_text: [
//          {
//            text: {
//              content: 'notion API로 만들어진 페이지입니다.',
//            },
//          },
//        ],
//      },
//    },
//  ],
//})
