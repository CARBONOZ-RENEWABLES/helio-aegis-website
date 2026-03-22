declare global {
  var mongoose: {
    conn: typeof import('mongoose') | null;
    promise: Promise<typeof import('mongoose')> | null;
  };

  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      RESEND_API_KEY: string;
      RESEND_FROM_EMAIL: string;
      UPSTASH_REDIS_REST_URL: string;
      UPSTASH_REDIS_REST_TOKEN: string;
      REVALIDATE_SECRET: string;
      INITIAL_ADMIN_EMAIL: string;
      INITIAL_ADMIN_PASSWORD: string;
    }
  }
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'editor' | 'viewer';
  permissions: {
    canPublish: boolean;
    canDeleteContent: boolean;
    canManageUsers: boolean;
    canViewAnalytics: boolean;
    editableModules: string[];
  };
}

declare module 'next-auth' {
  interface Session {
    user: AdminUser;
  }
  interface User extends AdminUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends AdminUser {}
}

export {};
