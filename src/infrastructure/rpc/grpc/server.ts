import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import {
  CreateUserProfileRequest,
  CreateUserProfileResponse,
} from "@buxlo/common";
import { UserRepository } from "../../repositories/userRepositary";
import { MentorRepository } from "../../repositories/mentorRepositary";

//loadin prorofile path currently on nodemodules that i created pacakge
const PROTO_PATH = path.join(
  __dirname,
  "../../../../node_modules/@buxlo/common/src/protos/auth.proto"
);

//it return ob
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});

// convert into grpc obje with what we neamed definition in there
const userProto = (grpc.loadPackageDefinition(packageDefinition) as any).user;

class UserServiceGrpc {
  private server: grpc.Server;
  private port: number;

  constructor(port: number) {
    this.server = new grpc.Server();
    this.port = port;
    this.initializeService();
  }

  private initializeService() {
    const userService = {
      CreateUserProfile: async (
        call: grpc.ServerUnaryCall<
          CreateUserProfileRequest,
          CreateUserProfileResponse
        >,
        callback: grpc.sendUnaryData<CreateUserProfileResponse>
      ) => {
        const { id, email, name, role, isGoogle, avatar } = call.request as any;
        const userRepo = new UserRepository();
        const mentorRepo = new MentorRepository();
        try {
          const existingUser = await userRepo.getUserDetails(id);
          const existingMentor = await mentorRepo.getMentorDetails(id);
          if (role == "user" && existingUser) {
            // update existing user instead of creating a new one
            const updatedUser = await userRepo.updateUserProfileData(id, {
              name,
            });
            callback(null, {
              id: updatedUser!.id,
              success: true,
            });
          } else if (role == "mentor" && existingMentor) {
            // update existing user instead of creating a new one
            const updatedMentor = await mentorRepo.updateMentorProfileData(id, {
              name,
            });
            callback(null, {
              id: updatedMentor!.id,
              success: true,
            });
          } else if (role == "user" && !existingUser) {
            const createdUser = await userRepo.create({
              id,
              email,
              name,
              role,
              isGoogle,
              avatar,
            });
            callback(null, {
              id: createdUser.id,
              success: true,
            });
          } else {
            const createdMentor = await mentorRepo.create({
              id,
              email,
              name,
              role,
              isGoogle,
              avatar,
              salary: 0,
              yearsOfExperience: 0,
            });
            callback(null, {
              id: createdMentor.id,
              success: true,
            });
          }
        } catch (error: any) {
          console.error("Error creating user:", error.message);
          callback(
            { code: grpc.status.INTERNAL, message: "creation failed" },
            null
          );
        }
      },
    };
    this.server.addService(userProto.UserService.service, userService);
  }

  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server.bindAsync(
          `0.0.0.0:${this.port}`,
          grpc.ServerCredentials.createInsecure(),
          () => {
            console.log("Grpc Service running on port 50051");
            resolve();
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const grpcService = new UserServiceGrpc(
  Number(process.env.GRPC_PORT) || 50051
);
