"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("../models/team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await team_1.Team.find({}).lean();
    res.json(teams);
});
exports.default = router;
