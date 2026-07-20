"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.Leaderboard.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const users = await user_1.User.insertMany([
            {
                name: 'Ada Lovelace',
                email: 'ada@example.com',
                role: 'admin',
                fitnessLevel: 'advanced',
                streak: 21,
            },
            {
                name: 'Linus Torvalds',
                email: 'linus@example.com',
                role: 'member',
                fitnessLevel: 'intermediate',
                streak: 14,
            },
            {
                name: 'Grace Hopper',
                email: 'grace@example.com',
                role: 'coach',
                fitnessLevel: 'advanced',
                streak: 30,
            },
        ]);
        await team_1.Team.insertMany([
            {
                name: 'Alpha Crew',
                sport: 'running',
                members: users.slice(0, 2).map((user) => user._id.toString()),
                goal: 'Complete a 10K relay',
            },
            {
                name: 'Beta Bikers',
                sport: 'cycling',
                members: [users[2]._id.toString()],
                goal: 'Ride 200 km this month',
            },
        ]);
        await activity_1.Activity.insertMany([
            {
                userId: users[0]._id.toString(),
                type: 'run',
                duration: '35m',
                distance: 6.2,
                date: new Date('2026-07-15'),
            },
            {
                userId: users[1]._id.toString(),
                type: 'strength',
                duration: '45m',
                distance: 0,
                date: new Date('2026-07-16'),
            },
            {
                userId: users[2]._id.toString(),
                type: 'bike',
                duration: '60m',
                distance: 25,
                date: new Date('2026-07-17'),
            },
        ]);
        await leaderboard_1.Leaderboard.insertMany([
            { userId: users[0]._id.toString(), name: 'Ada Lovelace', points: 1250, rank: 1 },
            { userId: users[1]._id.toString(), name: 'Linus Torvalds', points: 1180, rank: 2 },
            { userId: users[2]._id.toString(), name: 'Grace Hopper', points: 1320, rank: 3 },
        ]);
        await workout_1.Workout.insertMany([
            { title: 'HIIT Cardio', difficulty: 'moderate', duration: '30m', focus: 'endurance' },
            { title: 'Core Strength', difficulty: 'easy', duration: '20m', focus: 'mobility' },
            { title: 'Power Intervals', difficulty: 'hard', duration: '40m', focus: 'speed' },
        ]);
        console.log('Seed the octofit_db database with test data');
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
