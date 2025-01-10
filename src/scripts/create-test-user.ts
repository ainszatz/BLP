import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/user.dto';

async function createTestUser() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  const createUserDto: CreateUserDto = {
    username: 'testuser',
    password: 'testpassword',
    email: 'testuser@example.com', // Add a valid email if required
  };

  await userService.register(createUserDto);
  console.log('Test user created successfully.');

  await app.close();
}

createTestUser().catch((error) => {
  console.error('Error creating test user:', error);
});
