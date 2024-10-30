import { ApiProperty } from '@nestjs/swagger';

export class CustomResponseDto<T> {
  public static readonly SUCCESS_CODE = 0;
  public static readonly SUCCESS_STRING = 'Success';

  public static readonly FAIL_CODE = -1;
  public static readonly FAIL_STRING = 'Fail';

  @ApiProperty()
  resultCode: number;

  @ApiProperty()
  resultMessage: string;

  @ApiProperty()
  resultData: T[];

  // static method
  // public static makeSuccessCustomResponseDto<T>(resultData: T[]): CustomResponseDto<T> {
  //   return {
  //     resultCode: CustomResponseDto.SUCCESS_CODE,
  //     resultMessage: CustomResponseDto.SUCCESS_STRING,
  //     resultData: resultData,
  //   };
  // }

  public static makeSuccess(resultData: any) {
    return CustomResponseDto.make(
      CustomResponseDto.SUCCESS_CODE,
      CustomResponseDto.SUCCESS_STRING,
      resultData,
    );
  }

  public static makeFail(message: string) {
    return CustomResponseDto.make(CustomResponseDto.FAIL_CODE, message, []);
  }

  public static make(
    resultCode: number,
    resultMessage: string,
    resultData: any,
  ) {
    return Object.assign({
      resultCode: resultCode,
      resultMessage: resultMessage,
      resultData: resultData,
    });
  }
}

// export function makeSuccessCustomResponseDto(resultData: any) {
//   return {
//     resultCode: CustomResponseDto.SUCCESS_CODE,
//     resultMessage: CustomResponseDto.SUCCESS_STRING,
//     resultData: resultData,
//   };
// }

// export function makeFailCustomResponseDto(
//   resultCode: number = CustomResponseDto.SUCCESS_CODE,
//   resultMessage: string = CustomResponseDto.SUCCESS_STRING,
//   resultData: any,
// ) {
//   return {
//     resultCode: resultCode,
//     resultMessage: resultMessage,
//     resultData: resultData,
//   };
// }
