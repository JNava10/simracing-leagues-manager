import { Prisma } from '@prisma/client'

const presetChampionshipFull = Prisma.validator<Prisma.ChampionshipPresetDefaultArgs>()({
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
}})

export type ChampionshipPresetFull = Prisma.ChampionshipPresetGetPayload<typeof presetChampionshipFull>