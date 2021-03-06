
import { ApiController } from './api/api.controller';
import { App } from './app';
import { MONGODB_URI } from './util/secrets';

// import AuthenticationController from './authentication/authentication.controller';
// import PostController from './post/post.controller';
// import ReportController from './report/report.controller';
// import UserController from './user/user.controller';
// import validateEnv from './utils/validateEnv';

// validateEnv();

const app = new App(
  [
    new ApiController(),
    // new AuthenticationController(),
    // new UserController(),
    // new ReportController(),
  ],
);

app.listen();
