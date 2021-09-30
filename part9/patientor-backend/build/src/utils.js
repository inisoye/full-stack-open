"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var isString = function (text) {
    return typeof text === 'string' || text instanceof String;
};
var parseStringProperty = function (propertyValue, propertyName) {
    if (!propertyValue || !isString(propertyValue)) {
        throw new Error("Incorrect or missing " + propertyName);
    }
    return propertyValue;
};
var isDate = function (date) {
    return Boolean(Date.parse(date));
};
var parseDateOfBirth = function (date) {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth: ' + date);
    }
    return date;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isGender = function (param) {
    return Object.values(types_1.Gender).includes(param);
};
var parseGender = function (gender) {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
var createNewPatientEntry = function (_a) {
    var name = _a.name, dateOfBirth = _a.dateOfBirth, ssn = _a.ssn, gender = _a.gender, occupation = _a.occupation;
    var newEntry = {
        name: parseStringProperty(name, 'name'),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseStringProperty(ssn, 'ssn'),
        gender: parseGender(gender),
        occupation: parseStringProperty(occupation, 'occupation'),
    };
    return newEntry;
};
exports.default = createNewPatientEntry;
