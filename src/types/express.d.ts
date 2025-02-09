// src/common/types/express.d.ts
interface User {
  name: string;
  preferred_username: string;

  email: string;
}
console.log('express.d.ts file loaded');
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
