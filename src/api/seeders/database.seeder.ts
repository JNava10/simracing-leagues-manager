import {UserSeeder} from "./user.seeder";
import {Seeder} from "../utils/abstract/seeder";
import {TrackSeeder} from "./track.seeder";
import {ScoreSeeder} from "./score.seeder";
import {CategorySeeder} from "./category.seeder";
import { SimulatorSeeder } from "./simulator.seeder";

export const seeders: Seeder[] = [
    new UserSeeder(),
    new TrackSeeder(),
    new CategorySeeder(),
    new SimulatorSeeder()
]