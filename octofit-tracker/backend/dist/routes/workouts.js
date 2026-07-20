"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await workout_1.Workout.find({}).lean();
    res.json(workouts);
});
exports.default = router;
