"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("../models/activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await activity_1.Activity.find({}).lean();
    res.json(activities);
});
exports.default = router;
