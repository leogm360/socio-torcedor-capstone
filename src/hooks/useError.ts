import AppError from "../errors";

const useError = () => ({
  errAccess: new AppError(401, "Unauthorized, user credentials are invalid."),
  errAdmin: new AppError(403, "User must be an admin to access this resource."),
  errForbiddenProperties: new AppError(
    400,
    "The properties id, created_on and updated_on can't be updated by the user."
  ),
  errMissingProperties: new AppError(
    400,
    "Requisition body must have at least one property to be updated."
  ),
  errNotFound: new AppError(404, "Resource not found."),
  errConflict: new AppError(409, "Conflict, resource already registered."),
  errServer: new AppError(
    500,
    "Internal server error. If this persists try contacting the developer team."
  ),
});

export default useError;
