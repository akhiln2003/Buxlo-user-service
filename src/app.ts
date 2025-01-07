import { Iserver } from "./domain/interfaces/Iserver";
import {
  connectDB,
  disconnectDB,
} from "./infrastructure/database/mongodb/connection";
import { grpcService } from "./infrastructure/rpc/grpc/server";
import loggerMiddleware from "./presentation/middlewares/loggerMiddleware";

export class App {
  constructor(private server: Iserver) {}

  async initialize(): Promise<void> {
    this.registerMiddleware();
    this.registerRoutes();
    this.registerErrorHandler();
    await this.connectDB();
    await this.connectGrpc();
  }

  private registerMiddleware(): void {
    this.server.registerMiddleware(loggerMiddleware);
  }
  private registerRoutes(): void {
    // this.server.registerRoutes("/api/auth/user", userRoutes);
    // this.server.registerRoutes("/api/auth/mentor", mentorRoutes);
    // this.server.registerRoutes("/api/auth/admin", adminRoutes);
  }

  private registerErrorHandler(): void {
    // this.server.registerErrorHandler(errorHandler as any);
  }

  async start(port: number): Promise<void> {
    await this.server.start(port);
  }

  async shutdown(): Promise<void> {
    await disconnectDB();
    console.log("Shut dow server");
  }
  private async connectDB() {
    try {
      await connectDB();
    } catch (error) {
      console.log("Server could not be started", error);
      process.exit(1);
    }
  }

  private async connectGrpc(): Promise<void> {
    try {
      await grpcService.start();
      console.log("gRPC server started successfully.");
    } catch (error) {
      console.error("Failed to start gRPC server:", error);
    }
  }
}