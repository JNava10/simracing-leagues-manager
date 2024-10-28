import { match } from 'node:assert';
import { ScoreService } from './score.service';
import { ScoreSystem } from '../utils/interfaces/score.interface';
import {prisma} from "../app";
import {ChampionshipCreation, ChampionshipData, ChampionshipRound, PresetCreation, Team} from "../utils/interfaces/championship.interface";
import { Layout } from "../utils/interfaces/layout.interface";
import { TeamService } from "./team.service";

export class DatabaseService {
    static clearTables = async () => {
        const tables = prisma.$queryRaw`SHOW TABLES`;
    };
}
