import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsInt()
  authorId?: number; // Optional for unregistered users
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
