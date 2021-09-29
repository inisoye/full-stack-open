"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var diagnoses_1 = __importDefault(require("../../data/diagnoses"));
var getEntries = function () {
    return diagnoses_1.default;
};
exports.default = { getEntries: getEntries };
