//채연이꺼

"use strict";

const PORT = process.env.PORT || 3000;
const logger = require("../src/config/logger");
const app = require("../app");


app.listen(PORT, () => {
    logger.info(`${PORT} 포트에서 서버가 가동되었습니다.`);
});
