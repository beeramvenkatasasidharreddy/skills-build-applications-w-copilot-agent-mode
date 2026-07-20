import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
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

    await Team.insertMany([
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

    await Activity.insertMany([
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

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), name: 'Ada Lovelace', points: 1250, rank: 1 },
      { userId: users[1]._id.toString(), name: 'Linus Torvalds', points: 1180, rank: 2 },
      { userId: users[2]._id.toString(), name: 'Grace Hopper', points: 1320, rank: 3 },
    ]);

    await Workout.insertMany([
      { title: 'HIIT Cardio', difficulty: 'moderate', duration: '30m', focus: 'endurance' },
      { title: 'Core Strength', difficulty: 'easy', duration: '20m', focus: 'mobility' },
      { title: 'Power Intervals', difficulty: 'hard', duration: '40m', focus: 'speed' },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
