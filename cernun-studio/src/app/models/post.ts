export class Post {
  title: string;
  userName: string;
  date: string;
  content: string;

  constructor(title?: string, userName?: string, date?: string, content?:string) {
    this.title = title || "";
    this.userName = userName || "";
    this.date = date || "";
    this.content = content || "";
  }
}
