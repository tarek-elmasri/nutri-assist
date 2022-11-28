// merging express-session SessionData interface

declare global {
  declare module 'express-session' {
    export interface SessionData {
      user_id: string | undefined;
    }
  }
}
