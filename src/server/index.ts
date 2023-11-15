import express, { Application, Request, Response } from "express"
import helmet from "helmet"
import cors from "cors"
import compress from "compression"
import services from "./services"
import { readFileSync } from "fs"
import { join } from "path"
const sampleQueryPath = join(__dirname, "../../sample-query.gql")
const sampleQuery = readFileSync(sampleQueryPath, "utf8") as string

const app: Application = express()

if (process.env.NODE_ENV === "production") {
  // you should use dotenv, dotenv-expand and a .env file. don't forget to include it in .gitignore
  app.use(helmet())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "*.monsite.com"],
      },
    })
  )
}
app.use(helmet.referrerPolicy({ policy: "same-origin" }))
app.use(cors())
app.use(compress())

for (const name of Object.keys(services)) {
  if (name === "graphql") {
    ;(async () => {
      await services[name].start()
      services[name].applyMiddleware({ app })
    })()
  } else {
    app.use(`/$name`, services[name])
  }
}

app.listen(8000, () => {
  console.log(
    "Listening on port 8000!\n",
    "Test it with http://localhost:8000/graphql\n",
    "Sample query in Postman :\n\n",
    sampleQuery
  )
})

//
