import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Put } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../../common/enums/swagger-consumes.enum';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { Role, User } from 'generated/prisma';
import { AuthDecorator } from '../../../common/decorators/auth.decorator';
import { Roles } from '../../../common/decorators/role.decorator';
import { SkipAuth } from '../../../common/decorators/skip-auth.decorator';
import { QueryProductDto } from '../dto/query-product.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { SeoMetaDto } from '../dto/seo-meta.dto';

@Controller('product')
@ApiTags('product')
@AuthDecorator()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productService.create(user.id, createProductDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() queryProductDto: QueryProductDto) {
    return this.productService.findAll(queryProductDto);
  }

  @Get('drafts')
  findAllDrafts(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.productService.findAllDrafts(user.id, paginationDto);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Get('draft/:id')
  findOneDraft(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.productService.findOneDraft(user.id, id);
  }

  @Patch("favorite-toggle/:id")
  favoriteToggle(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.productService.favoriteToggle(user.id, id)
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @GetUser() user: User) {
    return this.productService.update(user.id, id, updateProductDto);
  }

  @Put(':id/seo-meta')
  upsertSeo(@Param('id', ParseIntPipe) id: number, @Body() seoMetaDto: SeoMetaDto, @GetUser() user: User) {
    return this.productService.upsertSeoMeta(user.id, id, seoMetaDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.productService.remove(user.id, id);
  }
}
