"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var default_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZmlyc3RfbmFtZSI6Ikp1ZGUiLCJsYXN0X25hbWUiOiJIIiwicGFzc3dvcmQiOiIkMmIkMTAkNy9XZTRBb0pDamNvOWdwdnhHUUJQLkJheGViT2Q1RWVpOVRIVFdnL3pqSll1d2hxa2tiRzYifSwiaWF0IjoxNjMxMDIzNzk4fQ.ZC16NDb-k4A-BXlxluiYRDwAFAZDWzNSrcCd2MYoRBA";
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization || '';
        var token = authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(default_token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json("Error occured");
    }
};
exports["default"] = verifyAuthToken;
