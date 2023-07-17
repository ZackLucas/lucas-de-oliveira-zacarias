import { HealthCheck } from '../data/use-case/healthcheck.js'

export class HealthCheckController {
  healthcheck(_req, res) {
    const useCase = new HealthCheck()

    const response = useCase.execute()

    return res.json(response)
  }
}
