export class Certificate {
  private certificates: Map<string, Certificate> = new Map()
  private readonly renewalThresholdDays = 30

  private checkInterval: NodeJs.Timer | null = null

}