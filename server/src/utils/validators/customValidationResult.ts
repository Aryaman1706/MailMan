import { ValidationResult } from "joi";

export default interface CustomValidationResult<T = any>
  extends ValidationResult {
  value: T;
}
