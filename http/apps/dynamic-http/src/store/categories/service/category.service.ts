import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { StoreHttpService } from "../../common/service/store-http.service";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { CategoryUpdateDto } from "../dto/category-update.dto";
import { CategoryReadDto } from "../dto/category-read.dto";
import { CategorySaveDto } from "../dto/category-save.dto";
import { CategoryProductReadDto } from "../dto/category-product-read.dto";

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(private readonly httpService: StoreHttpService) {}

  public async findAllCategory() {
    const { data } = await firstValueFrom(
      this.httpService.get<CategoryReadDto[]>(`categories`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async findCategoryById(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<CategoryReadDto>(`categories/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async findCategoryProductsById(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<CategoryProductReadDto[]>(`categories/${id}/products`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async saveCategory(dto: CategorySaveDto) {
    const { data } = await firstValueFrom(
      this.httpService.post<CategoryReadDto>(`categories`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async updateCategory(id: number, dto: CategoryUpdateDto) {
    const { data } = await firstValueFrom(
      this.httpService.put<CategoryReadDto>(`categories/${id}`, dto).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }

  public async deleteCategory(id: number) {
    const { data } = await firstValueFrom(
      this.httpService.delete<boolean>(`categories/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);

          throw new BadRequestException(error.response.data);
        })
      )
    );

    return data;
  }
}
