import * as bcrypt from 'bcrypt';

export class HashPassword {
  async createSalt() {
    const salt = await bcrypt.genSalt(10);
    return salt;
  }
  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
  async validatePassword(
    myPlaintextPassword: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(myPlaintextPassword, hash);
  }
}
