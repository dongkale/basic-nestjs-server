import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(
  app: INestApplication,
  title: string,
  basePrefix: string,
): void {
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(title + ' API Documents')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key') // 각 controller 에 @ApiSecurity('x-api-key') 추가 필요(대소문자 구별)
    .addApiKey(
      { type: 'apiKey', name: 'x-api-device-id', in: 'header' },
      'x-api-device-id',
    ) // 각 controller 에 @ApiSecurity('x-api-user') 추가 필요(대소문자 구별)
    // .addApiKey(
    //   { type: 'apiKey', name: 'x-api-program', in: 'header' },
    //   'x-api-program',
    // ) // 각 controller 에 @ApiSecurity('x-api-program') 추가 필요(대소문자 구별)
    .setVersion('1.0.0')
    .setContact('Lee Dong Kwan', '', 'dklee@lennon.co.kr')
    .setLicense('Apache 2.0', 'ttp://www.apache.org/licenses/LICENSE-2.0.html')
    .setVersion('1.0')
    .addServer(basePrefix)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      // docExpansion: 'none',
      // filter: true,
      // showRequestDuration: true,
      apisSorter: 'order',
      tagsSorter: 'order',
      // operationsSorter: 'order',
      operationsSorter: (a: any, b: any) => {
        const methodsOrder = [
          'get',
          'post',
          'put',
          'patch',
          'delete',
          'options',
          'trace',
        ];
        let result =
          methodsOrder.indexOf(a.get('method')) -
          methodsOrder.indexOf(b.get('method'));

        if (result === 0) {
          result = a.get('path').localeCompare(b.get('path'));
        }

        return result;
      },
    },
  });
}