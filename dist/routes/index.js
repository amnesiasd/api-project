"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./api/users"));
var products_1 = __importDefault(require("./api/products"));
var orders_1 = __importDefault(require("./api/orders"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var routes = express_1["default"].Router();
var corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
};
routes.use((0, cors_1["default"])(corsOptions));
routes.use(body_parser_1["default"].json());
routes.get('/', function (req, res, next) {
    res.send('Main api route');
});
routes.use('/users', users_1["default"]);
routes.use('/products', products_1["default"]);
routes.use('/orders', orders_1["default"]);
exports["default"] = routes;
