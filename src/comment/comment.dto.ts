import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  postId: string; // Adjust type if necessary
}

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  content?: string;
}
