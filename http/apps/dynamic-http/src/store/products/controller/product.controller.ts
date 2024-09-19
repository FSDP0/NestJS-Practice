import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { ProductSaveDto } from "../dto/product-save.dto";
import { ProductUpdateDto } from "../dto/product-update.dto";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProductReadDto } from "../dto/product-read.dto";

@ApiTags("[002. Store EndPoint, Products REST API]")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: "모든 제품 조회" })
  @ApiOkResponse({ type: ProductReadDto, isArray: true })
  @Get()
  public async getAll() {
    return await this.productService.findAllProduct();
  }

  @ApiOperation({ summary: "특정 제품 조회" })
  @ApiOkResponse({ type: ProductReadDto })
  @Get(":id")
  public async getOne(@Param("id") id: number) {
    return await this.productService.findProductById(id);
  }

  @ApiOperation({ summary: "새로운 제품 정보 등록" })
  @ApiCreatedResponse({ type: ProductReadDto })
  @Post()
  public async createProduct(@Body() dto: ProductSaveDto) {
    return await this.productService.saveProduct(dto);
  }

  @ApiOperation({ summary: "기존 제품 정보 갱신" })
  @ApiOkResponse({ type: ProductReadDto })
  @Put(":id")
  public async editProduct(@Param("id") id: number, @Body() dto: ProductUpdateDto) {
    return await this.productService.updateProduct(id, dto);
  }

  @ApiOperation({ summary: "기존 제품 정보 삭제" })
  @ApiOkResponse({ type: Boolean })
  @Delete(":id")
  public async removeProduct(@Param("id") id: number) {
    return await this.productService.deleteProduct(id);
  }
}
