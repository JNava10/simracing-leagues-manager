import {ScoreSystemSeed} from "../utils/interfaces/score.interface";
import {ExtraScoreName} from "../utils/constants/score.constants";

export const scoreSeedList: ScoreSystemSeed[] =
    [
        {
            "name": "F1 2010-2018",
            "description": "",
            "positions": [
                { position: '1', score: '25' },
                { position: '2', score: '18' },
                { position: '3', score: '15' },
                { position: '4', score: '12' },
                { position: '5', score: '10' },
                { position: '6', score: '8' },
                { position: '7', score: '6' },
                { position: '8', score: '4' },
                { position: '9', score: '2' },
                { position: '10', score: '1' },
            ]
        },
        {
            "name": "F1 Actual score system",
            "description": "",
            "positions": [
                { position: '1', score: '25' },
                { position: '2', score: '18' },
                { position: '3', score: '15' },
                { position: '4', score: '12' },
                { position: '5', score: '10' },
                { position: '6', score: '8' },
                { position: '7', score: '6' },
                { position: '8', score: '4' },
                { position: '9', score: '2' },
                { position: '10', score: '1' },
            ],
            "extra": [
                { key: ExtraScoreName.FASTEST_LAP, score: '1' }
            ]

        },
        {
            "name": "Indycar actual point system",
            "description": "",
            "positions": [
                { position: '1', score: '50' },
                { position: '2', score: '40' },
                { position: '3', score: '35' },
                { position: '4', score: '32' },
                { position: '5', score: '30' },
                { position: '6', score: '28' },
                { position: '7', score: '26' },
                { position: '8', score: '24' },
                { position: '9', score: '22' },
                { position: '10', score: '20' },
                { position: '11', score: '19' },
                { position: '12', score: '18' },
                { position: '13', score: '17' },
                { position: '14', score: '16' },
                { position: '15', score: '15' },
                { position: '16', score: '14' },
                { position: '17', score: '13' },
                { position: '18', score: '12' },
                { position: '19', score: '11' },
                { position: '20', score: '10' },
                { position: '21', score: '9' },
                { position: '22', score: '8' },
            ],
            "extra": [
                { key: ExtraScoreName.POLE, score: '1' },
                { key: ExtraScoreName.LEAD_ONE_LAP_LEAST, score: '1' },
                { key: ExtraScoreName.MOST_LED_LAPS, score: '2' }
            ]
        },
    ]
