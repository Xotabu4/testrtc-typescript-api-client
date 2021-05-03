import type { BaseHttpRequest } from "http-req-builder"

export type TestRTCApiControllerOptions = {
    apiKey: string;
    testRtcUrl: string;
    requestBuilder: new () => BaseHttpRequest
}

export class BaseController {
    constructor(protected readonly options: TestRTCApiControllerOptions) { }

    protected preparedRequest() {
        return new this.options.requestBuilder()
            .headers({ apikey: this.options.apiKey })
            .prefixUrl(this.options.testRtcUrl)
    }
}