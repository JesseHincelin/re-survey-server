import { jwtMiddleware } from "../Middlewares/jwt.middleware.js";
import { sanitizeMiddleware } from "../Middlewares/sanitize.middleware.js";
import initUserRoutes from "./user.routes.js";
// import initAdminRoutes from "./admin.routes.js";
// import initTodoRoutes from "./todo.routes.js";

const initRoutes = (app) => {
  initUserRoutes(app, sanitizeMiddleware, jwtMiddleware);
  //   initAdminRoutes(app, sanitizeMiddleware, jwtMiddleware);
  //   initTodoRoutes(app, sanitizeMiddleware, jwtMiddleware);
};

export default initRoutes;
