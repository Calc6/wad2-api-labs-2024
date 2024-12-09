import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies';
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel';

async function main() {
    console.log('Environment:', process.env.NODE_ENV);
    console.log('MongoDB URI:', process.env.MONGO_DB);

    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connected'))
      .catch(err => console.error('MongoDB connection error:', err));

    console.log('Dropping User collection...');
    await User.collection.drop().catch(err => console.log('User collection not found:', err));

    console.log('Dropping Movie collection...');
    await Movie.collection.drop().catch(err => console.log('Movie collection not found:', err));

    console.log('Creating users...');
    await User.create(users).then(() => console.log('Users created'))
                             .catch(err => console.error('Error creating users:', err));

    console.log('Creating movies...');
    await Movie.create(movies).then(() => console.log('Movies created'))
                               .catch(err => console.error('Error creating movies:', err));

    console.log('Database initialised');
    console.log(`${users.length} users loaded`);
    console.log(`${movies.length} movies loaded`);

    await mongoose.disconnect().then(() => console.log('Disconnected from MongoDB'));
}

main();
