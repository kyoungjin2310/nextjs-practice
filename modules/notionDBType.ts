export interface NotionDatabase {
  object: string;
  results: NotionList[];
  next_cursor: any;
  has_more: boolean;
  type: string;
  page: Page;
}

export interface NotionList {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  cover?: Cover;
  icon: any;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}

export interface CreatedBy {
  object: string;
  id: string;
}

export interface LastEditedBy {
  object: string;
  id: string;
}

export interface Cover {
  type: string;
  external: External;
}

export interface External {
  url: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Properties {
  github: Github;
  WorkPeriod: WorkPeriod;
  Tag: Tag;
  Description: Description;
  youtube: Youtube;
  Project: Project;
}

export interface Github {
  id: string;
  type: string;
  url?: string;
}

export interface WorkPeriod {
  id: string;
  type: string;
  date?: Date;
}

export interface Date {
  start: string;
  end: string;
  time_zone: any;
}

export interface Tag {
  id: string;
  type: string;
  multi_select: MultiSelect[];
}

export interface MultiSelect {
  id: string;
  name: string;
  color: string;
}

export interface Description {
  id: string;
  type: string;
  rich_text: RichText[];
}

export interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: any;
}

export interface Text {
  content: string;
  link: any;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Youtube {
  id: string;
  type: string;
  url?: string;
}

export interface Project {
  id: string;
  type: string;
  title: Title[];
}

export interface Title {
  type: string;
  text: Text2;
  annotations: Annotations2;
  plain_text: string;
  href: any;
}

export interface Text2 {
  content: string;
  link: any;
}

export interface Annotations2 {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Page {}
