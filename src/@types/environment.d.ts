declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      NEXT_PUBLIC_APP_URL: string;
      PREMIUM_PRICE: string;
    }
  }
}

export {};
