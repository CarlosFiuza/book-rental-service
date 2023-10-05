import { RentRepository } from '@app/repositories/rent-repository';
import { Injectable } from '@nestjs/common';

interface IMostRentedBooksByAddressRequest {
  initialYear?: number;
  finalYear?: number;
}

type RentedInfo = {
  address?: string;
  bookTitle?: string;
  num?: number;
};

type BooksByYear = {
  year: number;
  jan?: RentedInfo[];
  fev?: RentedInfo[];
  mar?: RentedInfo[];
  abr?: RentedInfo[];
  mai?: RentedInfo[];
  jun?: RentedInfo[];
  jul?: RentedInfo[];
  ago?: RentedInfo[];
  sep?: RentedInfo[];
  oct?: RentedInfo[];
  nov?: RentedInfo[];
  dez?: RentedInfo[];
};

interface IMostRentedBooksByAddressReponse {
  statistic: BooksByYear[];
}

@Injectable()
export class MostRentedBooksByAddress {
  constructor(private rentRepository: RentRepository) {}

  async execute(
    request: IMostRentedBooksByAddressRequest,
  ): Promise<IMostRentedBooksByAddressReponse> {
    const { initialYear, finalYear } = request;

    const data = await this.rentRepository.mostRentedBooksByAddress(
      initialYear,
      finalYear,
    );

    const response: IMostRentedBooksByAddressReponse = {
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
          const delayedInfo: RentedInfo = {
            address: aux[0],
            bookTitle: aux[1],
            num: Number(aux[2]),
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
