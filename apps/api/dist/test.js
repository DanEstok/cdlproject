"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function test() {
    console.log('Starting test...');
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        console.log('App created successfully');
        await app.close();
    }
    catch (error) {
        console.error('Error:', error);
    }
}
test();
//# sourceMappingURL=test.js.map