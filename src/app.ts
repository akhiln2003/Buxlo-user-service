import { errorHandler } from "@buxlo/common";
import { IServer } from "./domain/interfaces/IServer";
import {
  connectDB,
  disconnectDB,
} from "./infrastructure/database/mongodb/connection";
import { grpcService } from "./infrastructure/rpc/grpc/server";
import loggerMiddleware from "./presentation/middlewares/loggerMiddleware";
import { MentorRouter } from "./presentation/routes/mentor.routes";
import { UserRouter } from "./presentation/routes/user.routes";
import { CommonRouter } from "./presentation/routes/common.routes";
import { AdminRouter } from "./presentation/routes/admin.routes";
import { messageBroker } from "./infrastructure/MessageBroker/config";
import { grpcSubscriptionService } from "./infrastructure/rpc/grpc/subscriptionService";
import { PremiumCron } from "./infrastructure/external-services/premiumCron";

export class App {
  private _premiumCron: PremiumCron;
  constructor(private _server: IServer) {
    this._premiumCron = new PremiumCron();
  }

  async initialize(): Promise<void> {
    await this._connectDB();
    await this._connectGrpc();
    await this._connectKafka();
    this._registerMiddleware();
    this._registerRoutes();
    this._registerErrorHandler();
    this._startCrons();
  }

  private _registerMiddleware(): void {
    this._server.registerMiddleware(loggerMiddleware);
  }
  private _registerRoutes(): void {
    const userRoutes = new UserRouter().getRouter();
    const mentorRoutes = new MentorRouter().getRouter();
    const adminRoutes = new AdminRouter().getRouter();
    const commonRoutes = new CommonRouter().getRouter();

    this._server.registerRoutes("/api/user/mentor", mentorRoutes);
    this._server.registerRoutes("/api/user/user", userRoutes);
    this._server.registerRoutes("/api/user/admin", adminRoutes);
    this._server.registerRoutes("/api/user/common", commonRoutes);
  }

  private _registerErrorHandler(): void {
    this._server.registerErrorHandler(errorHandler);
  }

  async start(port: number): Promise<void> {
    await this._server.start(port);
  }

  async shutdown(): Promise<void> {
    await disconnectDB();
    await messageBroker.disconnect();
    console.log("Shut dow server");
  }
  private async _connectDB() {
    try {
      await connectDB();
    } catch (error) {
      console.log("Server could not be started", error);
      process.exit(1);
    }
  }

  private async _connectGrpc(): Promise<void> {
    try {
      await grpcService.start();
      await grpcSubscriptionService.start();
      console.log("gRPC server started successfully.");
    } catch (error) {
      console.error("Failed to start gRPC server:", error);
    }
  }

  private async _connectKafka(): Promise<void> {
    await messageBroker.connect();
  }

  private _startCrons(): void {
    this._premiumCron.start();
  }
}
