import { Application, RequestHandler, Router } from "express";
import { IServer } from "../../domain/interfaces/IServer";
import express from "express";
import cookieParser from "cookie-parser";
import { createServer, Server as HttpServer } from "http";

export class ExpressWebServer implements IServer {
  private _app: Application;
  private _server: HttpServer;

  constructor() {
    this._app = express();
    this._app.use(cookieParser());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(express.json());

    this._server = createServer(this._app);
  }
  registerMiddleware(middleware: RequestHandler): void {
    this._app.use(middleware);
  }
  registerRoutes(path: string, router: Router): void {
    this._app.use(path, router);
  }

  registerErrorHandler(middleware: RequestHandler): void {
    this._app.use(middleware);
  }
  async start(port: number): Promise<void> {
    return new Promise((res) => {
      this._server.listen(port, () => {
        console.log(`App listening on port ===> http://localhost:${port}/`);
        res();
      });
    });
  }

  async close(): Promise<void> {
    if (this._server) {
      return new Promise((resolve, reject) => {
        this._server.close((err?: Error) => {
          if (err) {
            console.error("Error closing", err);
            return reject(err);
          }
          console.log("Server closed");
          resolve();
        });
      });
    }
  }
}
