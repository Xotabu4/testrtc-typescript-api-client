import { definitions, paths } from "../../types/swagger";
import { BaseController } from "./base.controller";

// testrtc missing some endpoints in docs
// TODO: no get monitors endpoint
// TODO: no delete monitor endpoint
export class MonitorsController extends BaseController {
    /**
     * 
     * @param monitorId 
     * @param max Amount of last results to get. Max 100. Default 10
     * @returns 
     */
    async getLastMonitorRunId(monitorId: number | string, max: number = 10) {
        return (
            await this.preparedRequest()
                .url(`monitors/${monitorId}`)
                .method('GET')
                .searchParams({ max })
                .send<paths['/monitors/{monitorId}']['get']['responses']['200']['schema']>()
        ).body
    }
    async getLastMonitorRunStatus(monitorId: number | string) {
        return (
            await this.preparedRequest()
                .url(`monitors/${monitorId}/last`)
                .method('GET')
                .send<paths['/monitors/{monitorId}/last']['get']['responses']['200']['schema']>()
        ).body
    }
    async createMonitor(monitor: definitions['Monitor']) {
        return (
            await this.preparedRequest()
                .url(`monitors`)
                .method('POST')
                .body(monitor)
                .send<paths['/monitors/']['post']['responses']['201']['schema']>()
        ).body
    }
    async updateMonitorStatus(id: string | number, status: boolean) {
        return (
            await this.preparedRequest()
                .url(`monitors/${id}/status`)
                .method('PUT')
                .body({ status })
                // TODO: cannot find structure of response
                .send<unknown>()
        ).body
    }
}