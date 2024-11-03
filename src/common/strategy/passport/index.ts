import passport from "passport";
import { jwtStrategy } from "./JwtPassportStrategy";

passport.use(jwtStrategy);

export default passport;
