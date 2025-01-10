import { User } from '../user.entity'; // Adjust the path to your User entity or interface
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    username?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      session: SessionData;
      user?: User;
    }
  }
}
