import type { paths } from "../../types/swagger";
import { BaseController } from "./base.controller";

type TestRunInformationSchema = paths['/testruns/{testRunId}']['get']['responses']['200']['schema']

// Is not described in swagger docs
type TestRunStats = {
    stats: {
        score: string, // "3.3"
        callSetupTime: string, // "2.00s"
        audio: {
            recv: {
                bitrate: string, // "24640"
                packetLoss: string, // "0.108"
                jitter: string, // "2"
            },
            send: {
                bitrate: string, // "27312"
                packetLoss: string, // "0.096"
                jitter: string, // "2"
                rtt: string // "2"
            }
        },
        video: {
            recv: {
                bitrate: string, // "685492"
                packetLoss: string, // "0.108"
                jitter: string // "58"
            },
            send: {
                bitrate: string, // "774789"
                packetLoss: string, // "0.092"
                jitter: string, // "131"
                rtt: string // "131"
            }
        },
        browserCpu: number, // 268
        browserMemory: number, // 1273
        probeCpu: number, // 35
        probeMemory: number // 89
    }
}

export class TestRunsController extends BaseController {
    async getDetailedTestRunInformation(id: string | number) {
        return this.getTestRunInformation<TestRunStats>(id, true)
    }
    async getShortTestRunInformation(id: string | number) {
        return this.getTestRunInformation(id, false)
    }
    async getTestRunInformation<T = {}>(id: string | number, detailed: boolean = false) {
        return (
            await this.preparedRequest()
                .url(`v1/testruns/${id}`)
                .searchParams({ detailed })
                .send<TestRunInformationSchema & T>()
        ).body
    }
}
