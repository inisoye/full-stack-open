"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var diagnoses_1 = __importDefault(require("../services/diagnoses"));
var router = express_1.default.Router();
router.get('/', function (_req, res) {
    res.send(diagnoses_1.default.getEntries());
});
exports.default = router;
