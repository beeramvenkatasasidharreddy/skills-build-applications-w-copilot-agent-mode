import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

async function verify() {
  await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
  console.log('users', await User.find({}).lean());
  console.log('teams', await Team.find({}).lean());
  console.log('activities', await Activity.find({}).lean());
  console.log('leaderboard', await Leaderboard.find({}).lean());
  console.log('workouts', await Workout.find({}).lean());
  await mongoose.disconnect();
}

verify().catch((error) => {
  console.error(error);
  process.exit(1);
});
