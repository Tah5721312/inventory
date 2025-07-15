// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
// import { generateToken, verifyToken } from "../../../utils/auth"; // Correct the import path
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method } = req;

//   switch (method) {
//     case "POST":
//       try {
//         const { email, password } = req.body;
//         const user = await prisma.user.findUnique({ where: { email } });

//         if (!user || !bcrypt.compareSync(password, user.password)) {
//           return res.status(401).json({ error: "Invalid email or password" });
//         }

//         const token = generateToken(user.id);
//         res.setHeader(
//           "Set-Cookie",
//           `session_token=${token}; HttpOnly; Path=/; Max-Age=3600`
//         ); // Token expires in 1 hour
//         return res.status(200).json(user);
//       } catch (error) {
//         console.error("Error during authentication:", error);
//         return res.status(500).json({ error: "Internal server error" });
//       }

//     case "GET":
//       try {
//         const token = req.cookies["session_token"];
//         if (!token) {
//           return res.status(401).json({ error: "Unauthorized" });
//         }

//         const decoded = verifyToken(token);
//         if (!decoded) {
//           return res.status(401).json({ error: "Unauthorized" });
//         }

//         const authenticatedUser = await prisma.user.findUnique({
//           where: { id: decoded.userId },
//         });
//         return res.status(200).json(authenticatedUser);
//       } catch (error) {
//         console.error("Error during authentication:", error);
//         return res.status(500).json({ error: "Internal server error" });
//       }

//     case "DELETE":
//       try {
//         res.setHeader(
//           "Set-Cookie",
//           "session_token=; HttpOnly; Path=/; Max-Age=0"
//         );
//         return res.status(204).end();
//       } catch (error) {
//         console.error("Error during logout:", error);
//         return res.status(500).json({ error: "Internal server error" });
//       }

//     default:
//       res.setHeader("Allow", ["POST", "GET", "DELETE"]);
//       return res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// };

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { generateToken, verifyToken } from "../../../utils/auth";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allowedOrigins = [
    "https://stockly-inventory.vercel.app",
    "https://stockly-inventory-managment-nextjs-ovlrz6kdv.vercel.app",
    "https://stockly-inventory-managment-nextjs-arnob-mahmuds-projects.vercel.app",
    "https://stockly-inventory-managment-n-git-cc3097-arnob-mahmuds-projects.vercel.app",
    req.headers.origin,
  ];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://stockly-inventory.vercel.app"
    );
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle preflight requests
  }

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = generateToken(user.id);

        // Determine if the connection is secure
        const isSecure =
          req.headers["x-forwarded-proto"] === "https" ||
          process.env.NODE_ENV !== "development";

        res.setHeader(
          "Set-Cookie",
          `session_token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=None; ${
            isSecure ? "Secure" : ""
          }`
        ); // Token expires in 1 hour
        return res.status(200).json(user);
      } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

    case "GET":
      try {
        const token = req.cookies["session_token"];
        if (!token) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const authenticatedUser = await prisma.user.findUnique({
          where: { id: decoded.userId },
        });
        return res.status(200).json(authenticatedUser);
      } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

    case "DELETE":
      try {
        res.setHeader(
          "Set-Cookie",
          "session_token=; HttpOnly; Path=/; Max-Age=0"
        );
        return res.status(204).end();
      } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

    default:
      res.setHeader("Allow", ["POST", "GET", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
