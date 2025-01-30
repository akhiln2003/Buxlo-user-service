import { z } from "zod";



export const fetchprofileDto = z.object( {
    id: z.string().refine((id) => {
        return /^[0-9a-f]{24}$/.test(id);
    }, {
        message: "Invalid MongoDB ObjectId",
    })
  });
  