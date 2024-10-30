import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key-user',
) {
  private readonly logger = new Logger(HeaderApiKeyStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const { ip, method, originalUrl } = req;
    const context = { switchToHttp: () => ({ getRequest: () => req }) };

    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    const apiDeviceId = request.header('x-api-device-id') ?? '';

    const body = request.body;

    // const auth = await this.getAuthorized(os, apiKey, apiDeviceId);
    // if (isValidObject(auth) && auth.isPass) {
    //   this.logger.log(
    //     `Pass => Api Key: ${apiKey}, deviceId: ${apiDeviceId}, User: ${auth.user}, os: ${os}, ip: ${convIp}, method: ${method}, originalUrl: ${originalUrl}, body:${JSON.stringify(body)}`,
    //   );

    //   // return true;
    //   return {
    //     // controller 에 값을 넘긴다.
    //     apiUser: auth.user,
    //     apiKey: apiKey,
    //     ipAddr: convIp,
    //     isAdmin: auth.isAdmin,
    //     deviceId: apiDeviceId,
    //   };
    // } else {
    //   this.logger.error(
    //     `Refuse to Pass => Api Key: ${apiKey}, deviceId: ${apiDeviceId}, message: ${auth.message}, os: ${os}, ip: ${convIp}, method: ${method}, originalUrl: ${originalUrl}, body:${JSON.stringify(body)}`,
    //   );

    //   throw new UnauthorizedException('Unauthorized Access(401)');
    // }

    return true;
  }
}
