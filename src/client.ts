import { JsonRequest } from 'http-req-builder'

import type { TestRTCApiControllerOptions } from './controllers/base.controller';

import { TestsController } from './controllers/tests.controller';
import { AssetsController } from './controllers/assets.controller';
import { TestRunsController } from './controllers/testRuns.controller';
import { TestAgentsController } from './controllers/testAgents.controller';
import { MonitorsController } from './controllers/monitors.controller';
import { DefaultController } from './controllers/default.controller';
import { QualityRtcController } from './controllers/qualityrtc.controller';

/**
 * @url https://apidoc.testrtc.com/?deepLinking=true
 */
export class TestRTCApiClient {
    public readonly tests: TestsController;
    public readonly testRuns: TestRunsController;
    public readonly testAgents: TestAgentsController;
    public readonly monitors: MonitorsController;
    public readonly assets: AssetsController;
    public readonly default: DefaultController;
    public readonly qualityRtc: QualityRtcController;

    constructor(options: Partial<TestRTCApiControllerOptions> = {}) {
        const defaultOptions = {
            apiKey: process.env.TESTRTC_API_KEY,
            testRtcUrl: 'https://api.testrtc.com/v1/',
            requestBuilder: JsonRequest
        }
        const mergedOptions = {
            ...defaultOptions,
            ...options
        }
        this.assertHasApiKey(mergedOptions)

        this.tests = new TestsController(mergedOptions);
        this.testRuns = new TestRunsController(mergedOptions);
        this.testAgents = new TestAgentsController(mergedOptions);
        this.monitors = new MonitorsController(mergedOptions);
        this.assets = new AssetsController(mergedOptions);
        this.default = new DefaultController(mergedOptions);
        this.qualityRtc = new QualityRtcController(mergedOptions)
    }

    private assertHasApiKey(options: Partial<TestRTCApiControllerOptions>): asserts options is { apiKey: string } {
        if (options.apiKey == null || options.apiKey === '') {
            throw new Error('[TestRTCApiClient] No apiKey provided. Pass it in constructor options or set process.env.TESTRTC_API_KEY environment variable');
        }
    }
};
