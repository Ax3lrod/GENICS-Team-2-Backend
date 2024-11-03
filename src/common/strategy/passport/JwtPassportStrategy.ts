import type { JwtPayload } from "@/common/types/jwtPayload";
import { env } from "@/config/env";
import { PrismaClient } from "@prisma/client";
import { ExtractJwt, Strategy as JwtStrategy, type StrategyOptions } from "passport-jwt";

const prisma = new PrismaClient();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET,
};

export const jwtStrategy = new JwtStrategy(options, async (jwtPayload: JwtPayload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: jwtPayload.id },
      select: { id: true },
    });

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});
