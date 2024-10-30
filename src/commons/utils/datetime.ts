import { IsTimeZone } from 'class-validator';
import dayjs from 'dayjs';

const DEFAULT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export class DateTime_T {
  private datetime = dayjs();

  constructor(date?: string) {
    this.datetime = dayjs(date);
  }

  get year(): number {
    return this.datetime.year();
  }

  get month(): number {
    return this.datetime.month();
  }

  get day(): number {
    return this.datetime.day();
  }

  get hour(): number {
    return this.datetime.hour();
  }

  get minute(): number {
    return this.datetime.minute();
  }

  get second(): number {
    return this.datetime.second();
  }

  get timestamp(): number {
    return this.datetime.unix();
  }

  format(template: string): string {
    return this.datetime.format(template);
  }

  toDate(): Date {
    return this.datetime.toDate();
  }

  toString(): string {
    return this.format(DEFAULT_DATETIME_FORMAT);
  }

  toSQLString(): string {
    return this.format(DEFAULT_DATETIME_FORMAT);
  }

  static now(): DateTime_T {
    return new DateTime_T();
  }
}

export const TimeToFormatString = function (t: number) {
  const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
  return new Date(t + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);
};

export const leftPad = function (num, digits = 2) {
  return num.toString().padStart(digits, '0');
};
