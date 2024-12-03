import { Prisma } from '@prisma/client'

export const presetChampionshipFull = Prisma.validator<Prisma.ChampionshipPresetDefaultArgs>()({
    include: {
        categories: {
            include: {
                categories: true
            }
        },
        layouts: {
            include: {
                layout: {
                    include: {
                        parent: true
                    }
                }
            }
        },
        author: true,
        scoreSystem: {
            include: {
                extra: true,
                positions: true
            }
        },
        teams: {
            include: {
                team: true
            }
        },
    }
})

export const championshipFull = Prisma.validator<Prisma.LeagueChampionshipDefaultArgs>()({
    include: {
        categories: {
            include: {
                categories: true
            }
        },
        calendar: {
            include: {
                layout: {
                    include: {
                        parent: true
                    }
                }
            }
        },
        author: true,
        teams: {
            include: {
                team: true
            }
        },
        simulator: true,
        scoreSystem: {
            include: {
                positions: true
            }
        }
    }
})

export type ChampionshipPresetFull = Prisma.ChampionshipPresetGetPayload<typeof presetChampionshipFull>
export type ChampionshipFull = Prisma.ChampionshipPresetGetPayload<typeof championshipFull>
