import {prisma} from "../../app";
import { SearchCategoryProps } from "../../utils/props/category.prop";
import {
    ChampionshipRound,
    LeagueEvent,
    LeagueEventCreation,
    Team
} from "../../utils/interfaces/championship/championship.interface";
import {TeamQuery} from "./team.query";
import {Layout} from "../../utils/interfaces/layout.interface";

export class EventQuery {

    static create = async (event: LeagueEventCreation, authorId: number) => {
        // @ts-ignore
        const created = await prisma.leagueEvent.create({
            data: {
                name: event.name,
                description: event.description,
                authorId,
                layoutId: event.layoutId,
                simulatorId: event.simulatorId,
                leagueId: event.leagueId
            }}) as LeagueEvent;

        console.log(created);

        const teamService = new TeamQuery();
        const createdTeams = await teamService.createTeamsReturningIds(event.teams);

        // Inserción de la tabla foranea de los equipos y su campeonato.
        for (const i in createdTeams) {
            const teamId = createdTeams[i];

            await prisma.eventTeam.create({
                data: {
                    teamId,
                    eventId: created.id
                }})
        }
    };
}
