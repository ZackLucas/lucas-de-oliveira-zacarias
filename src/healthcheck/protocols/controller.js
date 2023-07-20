import { HealthCheck } from '../data/use-case/healthcheck.js'

export class HealthCheckController {
  healthcheck(_req, res) {
    /*
      #swagger.description = 'Route for user authentication.'
    */
    const useCase = new HealthCheck()

    const response = useCase.execute()

    return res.json(response)
  }
}
