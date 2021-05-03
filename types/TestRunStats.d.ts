
// Is not described in swagger docs
export type TestRunStats = {
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