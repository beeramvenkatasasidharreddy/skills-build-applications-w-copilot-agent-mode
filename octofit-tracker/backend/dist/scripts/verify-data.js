"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
async function verify() {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/octofit_db');
    console.log('users', await user_1.User.find({}).lean());
    console.log('teams', await team_1.Team.find({}).lean());
    console.log('activities', await activity_1.Activity.find({}).lean());
    console.log('leaderboard', await leaderboard_1.Leaderboard.find({}).lean());
    console.log('workouts', await workout_1.Workout.find({}).lean());
    await mongoose_1.default.disconnect();
}
verify().catch((error) => {
    console.error(error);
    process.exit(1);
});
