import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CategorySaveDto } from "../dto/category-save.dto";
import { CategoryUpdateDto } from "../dto/category-update.dto";
import { CategoryReadDto } from "../dto/category-read.dto";
import { CategoryProductReadDto } from "../dto/category-product-read.dto";

@ApiTags("[001]. Store EndPoint, Categories REST API")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: "모든 카테고리 조회" })
  @ApiOkResponse({ type: CategoryReadDto, isArray: true })
  @Get()
  public async getAll() {
    return await this.categoryService.findAllCategory();
  }

  @ApiOperation({ summary: "특정 카테고리 조회" })
  @ApiOkResponse({ type: CategoryReadDto })
  @Get(":id")
  public async getOneById(@Param("id") id: number) {
    return this.categoryService.findCategoryById(id);
  }

  @ApiOperation({ summary: "특정 카테고리 내 제품들 조회" })
  @ApiOkResponse({ type: CategoryProductReadDto, isArray: true })
  @Get(":id/products")
  public async getProductsWithInCategoryById(@Param("id") id: number) {
    return await this.categoryService.findCategoryProductsById(id);
  }

  @ApiOperation({ summary: "새로운 카테고리 정보 등록" })
  @ApiOkResponse({ type: CategoryReadDto })
  @Post()
  public async createCategory(@Body() dto: CategorySaveDto) {
    return await this.categoryService.saveCategory(dto);
  }

  @ApiOperation({ summary: "기존 카테고리 정보 갱신" })
  @ApiOkResponse({ type: CategoryReadDto })
  @Put(":id")
  public async editCategory(@Param("id") id: number, @Body() dto: CategoryUpdateDto) {
    return await this.categoryService.updateCategory(id, dto);
  }

  @ApiOperation({ summary: "기존 카테고리 정보 삭제" })
  @ApiOkResponse({ type: Boolean })
  @Delete(":id")
  public async removeCategory(@Param("id") id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
