import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { CustomResponseDto } from './custom-response.dto';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiCustomResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) => {
  return applyDecorators(
    ApiExtraModels(CustomResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CustomResponseDto) },
          {
            properties: {
              resultCode: {
                type: 'number',
                example: 0,
                description: '성공/실패: 성공:0, 실패:에러코드(>0)',
              },
              resultMessage: {
                type: 'string',
                example: 'Success',
                description:
                  '성공/실패 메세지: 성공: Success, 실패: 실패 메세지',
              },
              resultData: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
};

// https://velog.io/@debug/NestJS-Swagger-Common-Response-Type-%EC%84%A4%EC%A0%95
export const ApiCommonResponse = (
  obj: SchemaObject & Partial<ReferenceObject>,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          resultCode: {
            type: 'number',
            example: 0,
            description: '성공/실패: 성공:0, 실패:에러코드(>0)',
          },
          resultMessage: {
            type: 'string',
            example: 'Success',
            description: '성공/실패 메세지: 성공: Success, 실패: 실패 메세지',
          },
          resultData: {
            ...obj,
          },
        },
      },
    }),
  );
};
