import * as AuthService from "./auth.service";

export default function microserviceHeader() {
  return { Authorization: "Bearer" + AuthService.getCurrentUser().token };
}
