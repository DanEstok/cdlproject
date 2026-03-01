"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postcssConfig = exports.tailwindConfig = exports.eslintConfig = void 0;
var eslint_js_1 = require("./eslint.js");
Object.defineProperty(exports, "eslintConfig", { enumerable: true, get: function () { return __importDefault(eslint_js_1).default; } });
var tailwind_config_js_1 = require("./tailwind.config.js");
Object.defineProperty(exports, "tailwindConfig", { enumerable: true, get: function () { return __importDefault(tailwind_config_js_1).default; } });
var postcss_config_js_1 = require("./postcss.config.js");
Object.defineProperty(exports, "postcssConfig", { enumerable: true, get: function () { return __importDefault(postcss_config_js_1).default; } });
