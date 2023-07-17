export class HealthCheck {
  execute() {
    return {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    }
  }
}
