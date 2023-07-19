import * as bcryptjs from 'bcryptjs';

export default class Bcryptjs {
  static async encrypt(data: string) {
    return bcryptjs.hash(data, 10);
  }

  static async verify(data: string, encrypted: string) {
    return bcryptjs.compareSync(data, encrypted);
  }
}