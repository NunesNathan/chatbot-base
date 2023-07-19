import * as jwt from 'jsonwebtoken';

import { IUserInfo } from '@/context/chatbotContext';

const signOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
} as jwt.SignOptions;

export default class Token {
  public static create(data: IUserInfo): string {
    return jwt.sign(data, process.env.JWT_SECRET as jwt.Secret, signOptions);
  }

  public static check(token: string): IUserInfo {
    return jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as IUserInfo;
  }
}