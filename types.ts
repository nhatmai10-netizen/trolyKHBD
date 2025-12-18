
export interface LessonData {
  subject: string;
  lessonName: string;
  grade: string;
  duration: string;
  textbook: string;
  method: string;
  students: string;
  digitalCompetence: string;
  layout: 'standard' | 'column';
  fileData?: {
    data: string; // base64 string
    mimeType: string;
    fileName: string;
  };
}

export interface LessonResponse {
  content: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
