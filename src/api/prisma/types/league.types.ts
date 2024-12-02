import { Prisma } from '@prisma/client'

export const memberLeague = Prisma.validator<Prisma.LeagueMemberDefaultArgs>()({
    include: {
        league: true
    }
})

export const memberUser = Prisma.validator<Prisma.LeagueMemberDefaultArgs>()({
    include: {
        league: true
    }
})

export type LeagueInviteFull = Prisma.LeagueMemberGetPayload<typeof memberLeague>;
export type MemberLeaguesQuery = Prisma.LeagueMemberGetPayload<typeof memberLeague>;
