"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @types/uuid and uuid versions must match :https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42634#issuecomment-677426309
var uuid_1 = require("uuid");
var patients_1 = __importDefault(require("../../data/patients"));
var getEntries = function () {
    return patients_1.default;
};
var getNonSensitiveEntries = function () {
    return patients_1.default.map(function (_a) {
        var id = _a.id, name = _a.name, dateOfBirth = _a.dateOfBirth, gender = _a.gender, occupation = _a.occupation;
        return ({
            id: id,
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            occupation: occupation,
        });
    });
};
var addPatient = function (newEntry) {
    var id = (0, uuid_1.v4)();
    var newPatientEntry = __assign({ id: id }, newEntry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = { getEntries: getEntries, getNonSensitiveEntries: getNonSensitiveEntries, addPatient: addPatient };
