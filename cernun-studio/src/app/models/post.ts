export class Post {
  title: string;
  userName: string;
  date: string;
  content: string;
  id: string

  constructor(title?: string, userName?: string, date?: string, content?:string, id?: string) {
    this.title = title || "";
    this.userName = userName || "";
    this.date = date || "";
    this.content = content || "";
    this.id = id || "";
  }
}
