import { match } from 'node:assert';
import { ScoreQuery } from './score.query';
import { ScoreSystem } from '../../utils/interfaces/score.interface';
import {prisma} from "../../app";
import {ChampionshipCreation, Championship, ChampionshipRound, PresetCreation, Team} from "../../utils/interfaces/championship/championship.interface";
import { Layout } from "../../utils/interfaces/layout.interface";
import { TeamQuery } from "./team.query";

export class DatabaseQuery {
    static clearTables = async () => {
        const tables = prisma.$queryRaw`SHOW TABLES`;
    };
}
