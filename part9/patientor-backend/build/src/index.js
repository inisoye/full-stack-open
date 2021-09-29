"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var diagnoses_1 = __importDefault(require("./routes/diagnoses"));
var patients_1 = __importDefault(require("./routes/patients"));
var app = (0, express_1.default)();
var allowedOrigins = ['http://localhost:3002'];
var options = {
    origin: allowedOrigins,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(options));
var PORT = 3001;
app.get('/api/ping', function (_req, res) {
    res.send('you just pinged');
});
app.use('/api/diagnoses', diagnoses_1.default);
app.use('/api/patients', patients_1.default);
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
