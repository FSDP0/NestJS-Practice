import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { StoreHttpService } from "../../common/service/store-http.service";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { ProductUpdateDto } from "../dto/product-update.dto";
import { ProductReadDto } from "../dto/product-read.dto";
import { ProductSaveDto } from "../dto/product-save.dto";

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly httpService: StoreHttpService) {}

  public async findAllProduct() {
    const { data } = await firstValueFrom(
      this.httpService.get<ProductReadDto[]>(`products`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async findProductById(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<ProductReadDto>(`products/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async saveProduct(dto: ProductSaveDto) {
    const { data } = await firstValueFrom(
      this.httpService.post<ProductReadDto>(`products`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async updateProduct(id: number, dto: ProductUpdateDto) {
    const { data } = await firstValueFrom(
      this.httpService.put<ProductReadDto>(`products/${id}`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async deleteProduct(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.delete<boolean>(`products/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }
}
