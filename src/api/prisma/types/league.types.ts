import { Prisma } from '@prisma/client'

export const leagueInviteFull = Prisma.validator<Prisma.LeagueMemberDefaultArgs>()({
    include: {
        league: true
    }
})

export type LeagueInviteFull = Prisma.LeagueMemberGetPayload<typeof leagueInviteFull>;
