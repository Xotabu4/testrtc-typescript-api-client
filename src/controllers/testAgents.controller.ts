import type { definitions, paths } from "../../types/swagger";
import { BaseController } from "./base.controller";
import * as fs from 'fs';
import got from 'got';
import * as FormData from 'form-data';

type TestAgentInformationSchema = Required<paths['/testagents/{testAgentId}']['get']['responses']['200']['schema']>

type TestAgentStats = {
    stat: {
        audio: {
            recv: {
                bitRate: string // "26",
                packetTotal: string // "8,148",
                packetLoss: string // "929",
                packetLossPCT: string // "11",
                jitter: string // "2"
            },
            send: {
                bitRate: string // "26",
                packetTotal: string // "9,083",
                packetLoss: string // "828",
                packetLossPCT: string // "9",
                jitter: string // "2"
            }
        },
        video: {
            recv: {
                bitRate: string // "279",
                packetTotal: string // "8,990",
                packetLoss: string // "1,041",
                packetLossPCT: string // "12",
                jitter: string // "61"
            },
            send: {
                bitRate: string // "1,180",
                packetTotal: string // "28,636",
                packetLoss: string // "2,576",
                packetLossPCT: string // "9",
                jitter: string // "81"
            }
        },
        callSetupTime: string // "2.00s",
        score: number // 3.1
    }
}

type Filenames = 'browser_logs' | 'webrtc_internals_dump' | 'getstats_dump' | 'nighwatch_log'

type BrowserLogsResponse = {
    level: string;
    message: string;
    source: string;
    timestamp: number;
}

type WebRtcInternalsDump = {
    getUserMedia: {
        audio: string;
        origin: string;
        pid: number;
        rid: number;
        timestamp: number;
        video: string;
    },
    PeerConnections: any // complex dynamic structure, cannot be typified
    UserAgent: string
}

// TODO: Cannot find response example, any for now
type GetStatsDump = any;

type ScreenshotsResponse = {
    screens: {
        url: string;
        name: string;
        metadata: {
            url: string;
            timestamp: string;
        };
    }[];
}

export class TestAgentsController extends BaseController {
    async getShortTestAgentInformation(id: string | number) {
        return this.getTestAgentInformation(id, false)
    }
    async getDetailedTestAgentInformation(id: string | number) {
        return this.getTestAgentInformation<TestAgentStats>(id, true)
    }
    async getTestAgentInformation<T = {}>(id: string | number, detailed: boolean = false) {
        return (
            await this.preparedRequest()
                .url(`v1/testagents/${id}`)
                .searchParams({ detailed })
                .send<TestAgentInformationSchema & T>()
        ).body
    }
    async getTestAgentBrowserLogs(id: string | number) {
        return this.getTestAgentFile<BrowserLogsResponse>(id, 'browser_logs')
    }
    async getTestAgentWebRtcInternalsDump(id: string | number) {
        return this.getTestAgentFile<WebRtcInternalsDump>(id, 'webrtc_internals_dump')
    }
    async getTestAgentGetStatsDump(id: string | number) {
        return this.getTestAgentFile<GetStatsDump>(id, 'getstats_dump')
    }
    /**
     * TODO: Response body throws error on attempt to parse as JSON. Probably testrtc bug?
     * @param id 
     * @returns unparsed string
     */
    async getTestAgentNightwatchLog(id: string | number) {
        return this.getTestAgentFile<string>(id, 'nighwatch_log')
    }
    async getTestAgentFile<T = string>(id: string | number, filename: Filenames) {
        return (
            await this.preparedRequest()
                .url(`v1/testagents/${id}/files`)
                .searchParams({ filename })
                .send<T>()
        ).body
    }
    /**
     * Post file which will be uploaded to the test agent as part of results
     * @param id 
     * @param relativeFilePath 
     * @param filename 
     * @returns 
     */
    async uploadFileToTestAgent(id: string | number, relativeFilePath: string, filename: string) {
        const body = new FormData();
        body.append('file', fs.createReadStream(relativeFilePath));
        return (
            await got.post<definitions['CustomMetrics']>({
                prefixUrl: this.options.testRtcUrl,
                url: `v1/testagents/${id}/screenshots`,
                searchParams: { filename },
                body
            })
        ).body;
    }
    async getTestAgentScreenshots(id: string | number) {
        return (
            await this.preparedRequest()
                .url(`v1/testagents/${id}/screenshots`)
                .send<ScreenshotsResponse>()
        ).body
    }
}


