import {seeders} from "./seeders/database.seeder";

import {config} from "dotenv";

config()

const run = async () => {

    for (const seeder of seeders) {
        await seeder.run()
    }
}

const clearDatabase = () => {
    
}

run().catch((e) => {
    console.error(e)
    process.exit(1)
})