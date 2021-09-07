"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var orders = express_1["default"].Router();
orders.get('/', function (req, res) {
    res.send('Orders route');
});
exports["default"] = orders;
