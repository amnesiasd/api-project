"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var users = express_1["default"].Router();
users.get('/', function (req, res) {
    res.send('Users route');
});
users.get('/:id', function (req, res) {
    res.send("Users route for " + req.params.id);
});
exports["default"] = users;
