"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderStore = exports.OrderStatusStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStatusStore = /** @class */ (function () {
    function OrderStatusStore() {
    }
    OrderStatusStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM order_status";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Cannot get order status " + err_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStatusStore.prototype.createOrderStatus = function (desc) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO order_status(dbstatus) VALUES ($1) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [desc])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Cannot create order status " + err_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStatusStore.prototype["delete"] = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, newResult, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE from order_status";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        sql = "SELECT COUNT(*) from order_status";
                        return [4 /*yield*/, conn.query(sql)];
                    case 3:
                        newResult = _a.sent();
                        conn.release();
                        return [2 /*return*/, newResult.rowCount];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Cannot delete order status " + err_3);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStatusStore;
}());
exports.OrderStatusStore = OrderStatusStore;
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM orders";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Cannot get orders " + err_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    OrderStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT * FROM orders WHERE id = ($1)";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Cannot get orders " + err_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    OrderStore.prototype.showUserOrders = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "SELECT o.user_id, o.id, p.name, op.quantity, os.dbstatus\n            FROM users u   \n            join orders o\n            on o.user_id = u.id \n            join order_status os\n            on os.id = o.dbstatus\n            join order_products op\n            on op.order_id = o.id\n            join products p\n            on p.id = op.prod_id       \n            where u.id = ($1);";
                        return [4 /*yield*/, conn.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Cannot retrieve order for " + userId + " - " + err_6);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO orders (user_id, dbstatus) VALUES ($1, $2) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [order.user_id, order.dbstatus])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not create order for " + order.user_id + ": Error - " + err_7);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.createUserOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "INSERT INTO order_products (order_id, prod_id, quantity) VALUES ($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, conn.query(sql, [order.order_id, order.prod_id, order.quantity])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_8 = _a.sent();
                        throw new Error("Could not create order for " + order.order_id + ": Error - " + err_8);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.deleteOrder = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, newResult, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE from orders where id = ($1)";
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        sql = "SELECT COUNT(*) from orders";
                        return [4 /*yield*/, conn.query(sql)];
                    case 3:
                        newResult = _a.sent();
                        conn.release();
                        return [2 /*return*/, newResult.rowCount];
                    case 4:
                        err_9 = _a.sent();
                        throw new Error("Cannot delete order with id=" + id + ". " + err_9);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype["delete"] = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, newResult, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "DELETE from orders";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        sql = "SELECT COUNT(*) from orders";
                        return [4 /*yield*/, conn.query(sql)];
                    case 3:
                        newResult = _a.sent();
                        conn.release();
                        return [2 /*return*/, newResult.rowCount];
                    case 4:
                        err_10 = _a.sent();
                        throw new Error("Cannot delete orders " + err_10);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
;
