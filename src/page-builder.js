import { Page } from './page.js';

export class PageBuilder {
  constructor(databaseId) {
    this.page = new Page(databaseId);
  }

  setTitle(title) {
    this.page.addProperty('Name', {
      title: [{ text: { content: title } }],
    });
    return this;
  }

  setDate(date) {
    this.page.addProperty('Date', {
      date: { start: date.toISOString(), time_zone: 'Asia/Seoul' },
    });
    return this;
  }

  setIcon(emoji) {
    this.page.setIcon(emoji);
    return this;
  }

  addParagraph(content) {
    this.page.addChildBlock({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content } }],
      },
    });
    return this;
  }

  build() {
    return this.page;
  }
}
