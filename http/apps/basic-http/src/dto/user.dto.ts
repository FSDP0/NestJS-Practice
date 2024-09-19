import { ApiProperty } from "@nestjs/swagger";

class Name {
  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;
}

class GeoLocation {
  @ApiProperty()
  lat: string;

  @ApiProperty()
  long: string;
}

class Address {
  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  zipcode: string;

  @ApiProperty()
  geolocation: GeoLocation;
}

export class UserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ type: Name })
  name: Name;

  @ApiProperty({ type: Address })
  address: Address;

  @ApiProperty()
  phone: string;
}

export class AdditionalUserInfo {
  @ApiProperty()
  id: number;
}
