import {LeagueData} from "../utils/interfaces/league.interface";
import {prisma} from "../app";
import { SearchTrackProps } from "../utils/interfaces/track.interface";
import { Team } from "../utils/interfaces/championship.interface";

export class TeamService {
    createTeams = async (teams: Team[]) => {
        // @ts-ignore - Prisma da un error sintactico si los tipos no son exactamente iguales, aunque existan. 
        // En este caso no pasa nada, ya que simplemente hay un campo opcional en la interfaz que en el modelo
        // no lo es. Mientras esa propiedad exista, no tirará error.

        return await prisma.team.createMany({data: teams}) as Team[]
    };

    createTeamsReturningIds = async (teams: Team[]) => {
        const createdTeams: Team[] = [];

        for (const team of teams) {
            const createdTeam = await prisma.team.create({
                data: {
                    name: team.name!,
                    hexColor: team.hexColor!,
                    carEntries: team.carEntries!
                }
            });

            createdTeams.push(createdTeam);
        }

        return createdTeams.map(team => team.id)
    };

    createTeam = async (team: Team) => {
        const {
            name, 
            carEntries, 
            hexColor
        } = team;

        return await prisma.team.create({
            data: {
                name, 
                carEntries, 
                hexColor
            }
        });
  };
}
