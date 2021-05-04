import { TestFail, InspectInfo } from './test-result';

export interface StatusReport {
  pass(): Promise<void>;
  fail(reason: TestFail): Promise<void>;
  error(ex: Error): Promise<void>;
  progress(message: string): Promise<void>;
  inspect(info: InspectInfo): Promise<void>
}

export type ReportFeatureContext = { feature: string; };
export type ReportScenarioContext = ReportFeatureContext & { scenario: string };
export type ReportStepContext = ReportScenarioContext & { step: string };

export interface ReportSink {
  start(): Promise<Reporting>;
  end(reporting: Reporting): Promise<void>;
}

export interface Reporting {
  beforeFeature(context: ReportFeatureContext): StatusReport;
  beforeScenario(context: ReportScenarioContext): StatusReport;
  beforeStep(context: ReportStepContext): StatusReport;

  assert(context: ReportStepContext): StatusReport;
  check(context: ReportStepContext): StatusReport;

  afterFeature(context: ReportFeatureContext): StatusReport;
  afterScenario(context: ReportScenarioContext): StatusReport;
  afterStep(context: ReportStepContext): StatusReport;

  attempt(): StatusReport;

  info(context: ReportStepContext): StatusReport;
  dev(context: ReportStepContext): StatusReport;
  do(context: ReportStepContext): StatusReport;
  client(context: ReportStepContext): StatusReport;
}
