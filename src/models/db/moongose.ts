import mongoose, { ConnectOptions } from "mongoose";

class Mongo {
  async connnect(
    url: string,
    username: string,
    password: string
  ): Promise<boolean> {
    const logError = (message: string) => console.error(message);
    const log = (message: string) => console.log(message);
    //TODO: revisar para que funciona cada cosa.
    const mongooseConfig = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true, // <- Even if it's not recommended for production, it's responsability of the app to index the model.
      autoCreate: true,
      //   useCreateIndex: true,
      //   poolSize: 5,
      heartbeatFrequencyMS: 10000,
      auth: {
        username,
        password,
      },
      authSource: "admin",
    };

    return new Promise((resolve, reject) => {
      try {
        mongoose.connection.on("connected", () => resolve(true));
        mongoose.connection.on("connecting", () =>
          log("MongoDB connecting...")
        );
        mongoose.connection.on("open", () => log("MongoDB connected..."));
        mongoose.connection.on("reconnecting", () =>
          log("MongoDB reconnecting...")
        );
        mongoose.connection.on("reconnected", () =>
          log("MongoDB reconnected...")
        );
        mongoose.connection.on("error", (err) => logError(err.message));
        mongoose.connection.on("disconnected", () =>
          logError("MongoDB disconnected...")
        );
        mongoose.connect(url, mongooseConfig, reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  getMongoose(): typeof mongoose {
    return mongoose;
  }

  getDb(): typeof mongoose.connection.db {
    if (mongoose.STATES[mongoose.connection.readyState] !== "connected") {
      throw new Error("MongoDB isn't connected.");
    }
    return mongoose.connection.db;
  }

  async close(): Promise<boolean> {
    if (mongoose.STATES[mongoose.connection.readyState] === "disconnected") {
      return true;
    }

    try {
      await mongoose.connection.close();
    } catch (error) {
      throw error;
    }
    return true;
  }
}

export default new Mongo();
