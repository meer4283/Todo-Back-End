import {
  IsNotEmpty,
  IsString
} from 'class-validator';


/**
 * Base Class for Product validation
 */
export class BaseValidationSchema { }

export class GetDishValidationSchema extends BaseValidationSchema {

  @IsNotEmpty()
  @IsString()
  admin_user_id: String;

}

