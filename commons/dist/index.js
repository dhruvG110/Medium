"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.createBlog = exports.signInInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    name: zod_1.default.string().min(2),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(5)
});
exports.signInInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(5)
});
exports.createBlog = zod_1.default.object({
    title: zod_1.default.string().min(5).max(255),
    description: zod_1.default.string().min(5).max(255),
});
exports.updateBlog = zod_1.default.object({
    title: zod_1.default.string().min(5).max(255),
    description: zod_1.default.string().min(5).max(255),
    id: zod_1.default.string()
});
