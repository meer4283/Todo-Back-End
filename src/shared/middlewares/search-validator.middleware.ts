import to from 'await-to-js';
import asyncHandler from 'express-async-handler';
import { validateOrReject, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import {
  BaseSearchValidationSchema,
  GetSearchNameValidationSchema,

} from '../validators/search.class.validator';

import { BadRequestException } from '../exceptions/http.exceptions';
import { isEmpty } from 'lodash';

export const getCompanyNameValidator = asyncHandler(async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  // console.log('query:',req.query.companyName)
 
  // if (isEmpty(req?.query?.companyName))
  //   throw new BadRequestException('Required parameter "companyName" is missing! or empty');

  // const search = new GetSearchNameValidationSchema();
  // search.companyName = String(req.query.companyName);

  // await validateCompanyName(search);

  next();
});

async function validateCompanyName(search: BaseSearchValidationSchema): Promise<void> {
  const [error] = await to(validateOrReject(search));

  if (error && error instanceof Array) {
    const err: ValidationError[] = error;
    const message = err[0].constraints ? Object.values(err[0].constraints)[0] : '';
    throw new BadRequestException(message);
  }
}
