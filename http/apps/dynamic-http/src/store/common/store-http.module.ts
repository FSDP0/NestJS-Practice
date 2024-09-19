import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { StoreHttpService } from "./service/store-http.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      baseURL: "https://api.escuelajs.co/api/v1"
    })
  ],
  providers: [
    {
      provide: StoreHttpService,
      useExisting: HttpService
    }
  ],
  exports: [StoreHttpService]
})
export class StoreHttpModule {}
