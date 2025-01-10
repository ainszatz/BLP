import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pg-norizz-norizz.d.aivencloud.com',
      port: 20337,
      username: 'avnadmin',
      password: 'AVNS_NUbbAc3oe60SAncYe7f',
      database: 'defaultdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUJqXVM9ip985f2+83SbRBGAeVEFMwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNGVlYzAzOGYtN2ZkYS00ZDlmLWE4YTItMjNmMGJmNjhl
OGY2IFByb2plY3QgQ0EwHhcNMjUwMTA4MTExNjIxWhcNMzUwMTA2MTExNjIxWjA6
MTgwNgYDVQQDDC80ZWVjMDM4Zi03ZmRhLTRkOWYtYThhMi0yM2YwYmY2OGU4ZjYg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJ4+BCt9
stCrg7nusHpgPtJRjVhGU4LDL1JKy6/CyMKR4f316IRWMmvDJQaKGu6ydqKdt/+Z
QXaX+TAZqiZ2kxlCcoVm2Uc/MCbZgbYuFvqFjTIum86Npr1oWeyvHLUUFF6ct3eb
9hSOrdM90Kc9mS3fIlkCWNVDaSAIFhigx0/gOzxW0tEyLwUqhMJpZFB5fSWp5vyd
TzYoRPA4CLtIfPT4+dyLE/Ab4hha1W9mU0SIo6mzC+PXGiDPp1vKls3dWQRCfc73
HXhN3xxZEKRD6owH7/IWmwjbYuB5iGWJnGUuHFYJi07qo9BdybYbBEsFEid3JNjF
MxsukBzwc7JRz/q9qMhzyJOAxBj62wdCgFBoJXYyqNkb4bBsO+G2QaJjRQL7u+V4
MoljvrxTPFGLH1E1ygtTXSpqkygSFj7NTWlgVIwoYc8VF0skhIZ3I56sUuKqKWjF
jAVNIKHwTpjxT4wcWbLglz+yLzCRNbBrl5uqr1/0v8fp5EvEqAEFh7nRlwIDAQAB
oz8wPTAdBgNVHQ4EFgQUKt9ZnMRoZdL1yXnoIfumbfN1q9gwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBACwvkR3esZLcnqOv
EltDORT7YVA/nv3fIJlt8fL+lVYBK/GVjcGuqwoRjGuDaRfqTr55Jwl4NriRvRKt
C0coSWhwpgk14DeBXWmFsR3lMssOFrBoNaaU19VtgO+p3InTEgZWpiYBJ74QVR/w
IAIe1aZvGWL3IJgDYSFGfyWBr3PgB8CClujZZ9GkwnTR1BlngYGww5RvddO6tcZ6
YYvJoSkj4jy1jRGQCvcbcyhmsPBSeMLHQjDfdQ1ONqCjmhIKEjDH42bvS6ORnwj+
6L11TrC0P7Efw3KO6q22GnZ2mFqB5QJtmJz/h9Sf9ocE8De62fjwmnXOjLUldn7Y
lJjcdnwa01saCuiSSsY+rEX0ND23+dYwtXdzHw2Vnf0anSdF8SsnL2WjTX+d+249
NBPlm0cpsxKHlK2EVArMSRsoTp2/4d7ER2Vr+dLSOLsuQ6hlqvIwWZ1pXH02hIqh
uTEJWp9lCoT7yHLsvl2ZgAWJABpPcnV53VVSeVjf/LgKe5ioUA==
-----END CERTIFICATE-----`,
      },
    }),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
