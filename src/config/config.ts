import { config } from "dotenv-flow";
config();
const CONFIG = {
  DB: {
    MONGO: {
      /**
       * URL for the database.
       */
      URL: process.env.MONGO_URL,
      /**
       * Database user.
       */
      USER: process.env.MONGO_USER,

      /**
       * URL for the database.
       */
      PASSWORD: process.env.MONGO_PASSWORD,
    },
  },
};
export default CONFIG;
