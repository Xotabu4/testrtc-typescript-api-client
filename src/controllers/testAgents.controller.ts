import type { paths } from "../../types/swagger";
import type { TestAgentStats } from "../../types/TestAgentStats";
import { BaseController } from "./base.controller";

type TestAgentInformationSchema = Required<paths['/testagents/{testAgentId}']['get']['responses']['200']['schema']>

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
                .url(`testagents/${id}`)
                .searchParams({ detailed })
                .send<TestAgentInformationSchema & T>()
        ).body
    }
}


