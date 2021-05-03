export type TestAgentStats = {
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