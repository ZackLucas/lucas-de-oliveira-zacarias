import { HealthCheck } from '../../data/index'

describe('Use Cases -> Healthcheck', () => {
  it('Should be able return healthcheck', async () => {
    const instance = new HealthCheck()

    const response = instance.execute()

    expect(response).toHaveProperty('uptime')
    expect(response).toHaveProperty('message', 'OK')
    expect(response).toHaveProperty('timestamp')
  })
})
