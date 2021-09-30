"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var patients_1 = __importDefault(require("../services/patients"));
var utils_1 = __importDefault(require("../utils"));
var router = express_1.default.Router();
router.get('/', function (_req, res) {
    res.send(patients_1.default.getNonSensitiveEntries());
});
router.post('/', function (req, res) {
    try {
        var newPatientEntry = (0, utils_1.default)(req.body);
        var addedEntry = patients_1.default.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
