import {League} from "../../utils/interfaces/league.interface";
import {prisma} from "../../app";
import { SearchTrackProps } from "../../utils/interfaces/track.interface";
import { Team } from "../../utils/interfaces/championship/championship.interface";

export class NotificationQuery {
    pushInvite = async (target: number, leagueId: number) => {
        // @ts-ignore - Prisma da un error sintactico si los tipos no son exactamente iguales, aunque existan. 
        // En este caso no pasa nada, ya que simplemente hay un campo opcional en la interfaz que en el modelo
        // no lo es. Mientras esa propiedad exista, no tirará error.

        return await prisma.team.createMany({data: teams}) as Team[]
    };
}
