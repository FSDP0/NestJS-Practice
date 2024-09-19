import { Module } from "@nestjs/common";
import { BasicHttpController } from "./controller/basic-http.controller";
import { BasicHttpService } from "./service/basic-http.service";
import { HttpModule } from "@nestjs/axios";
import { BasicHttpAuthController } from "./controller/basic-http-auth.controller";
import { BasicHttpAuthService } from "./service/basic-http-auth.service";

@Module({
  imports: [
    HttpModule.register({
      baseURL: "https://fakestoreapi.com",
      timeout: 5000
    })
  ],
  controllers: [BasicHttpController, BasicHttpAuthController],
  providers: [BasicHttpService, BasicHttpAuthService]
})
export class BasicHttpModule {}
