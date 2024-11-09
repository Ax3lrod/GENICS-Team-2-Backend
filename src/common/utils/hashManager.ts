import bcrypt from "bcrypt";

export const hashManager = {
  hash: async (text: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedText = await bcrypt.hash(text, salt);
    return hashedText;
  },

  compare: async (text: string, hashedText: string) => {
    return await bcrypt.compare(text, hashedText);
  },
};
