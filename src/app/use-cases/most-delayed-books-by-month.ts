import { RentRepository } from '@app/repositories/rent-repository';
import { Injectable } from '@nestjs/common';

interface IMostDelayedBooksByMonthRequest {
  initialYear?: number;
  finalYear?: number;
}

type DelayedInfo = {
  bookTitle?: string;
  num?: number;
};

type BooksByYear = {
  year: number;
  jan?: DelayedInfo[];
  fev?: DelayedInfo[];
  mar?: DelayedInfo[];
  abr?: DelayedInfo[];
  mai?: DelayedInfo[];
  jun?: DelayedInfo[];
  jul?: DelayedInfo[];
  ago?: DelayedInfo[];
  sep?: DelayedInfo[];
  oct?: DelayedInfo[];
  nov?: DelayedInfo[];
  dez?: DelayedInfo[];
};

interface IMostDelayedBooksByMonthResponse {
  statistic: BooksByYear[];
}

@Injectable()
export class MostDelayedBooksByMonth {
  constructor(private rentRepository: RentRepository) {}

  async execute(
    request: IMostDelayedBooksByMonthRequest,
  ): Promise<IMostDelayedBooksByMonthResponse> {
    const { initialYear, finalYear } = request;

    const data = await this.rentRepository.mostDelayedBooksByMonth(
      initialYear,
      finalYear,
    );

    const response: IMostDelayedBooksByMonthResponse = {
      statistic: [],
    };

    let yearAux: number = 0;
    let bookPerYear: BooksByYear = { year: 0 };
    for (const monthInfo of data) {
      const { year, month, info } = monthInfo;
      if (yearAux === 0) {
        yearAux = year;
        bookPerYear.year = year;
      }
      if (yearAux !== year) {
        response.statistic.push(bookPerYear);
        bookPerYear = {
          year,
        };
      } else if (yearAux === year) {
        bookPerYear[month] = info.split(';').map((bookInfo: string) => {
          const aux: Array<string> = bookInfo.split('|');
          const delayedInfo: DelayedInfo = {
            bookTitle: aux[0],
            num: Number(aux[1]),
          };
          return delayedInfo;
        });
      }
    }

    if (response.statistic.length === 0) {
      response.statistic.push(bookPerYear);
    }

    return response;
  }
}
