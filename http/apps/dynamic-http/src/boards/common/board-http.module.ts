import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { BoardHttpService } from "./service/board-http.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      baseURL: "https://jsonplaceholder.typicode.com"
    })
  ],
  providers: [
    {
      provide: BoardHttpService,
      useExisting: HttpService
    }
  ],
  exports: [BoardHttpService]
})
export class BoardHttpModule {}
