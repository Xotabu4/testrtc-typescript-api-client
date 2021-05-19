import { definitions, paths } from "../../types/swagger";
import { BaseController } from "./base.controller";

// testrtc missing some endpoints in docs
// TODO: no get monitors endpoint
// TODO: no delete monitor endpoint
export class MonitorsController extends BaseController {
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