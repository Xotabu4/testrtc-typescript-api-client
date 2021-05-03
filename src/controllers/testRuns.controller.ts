import type { paths } from "../../types/swagger";
import type { TestRunStats } from "../../types/TestRunStats";
import { BaseController } from "./base.controller";

type TestRunInformationSchema = paths['/testruns/{testRunId}']['get']['responses']['200']['schema']

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
                .url(`testruns/${id}`)
                .searchParams({ detailed })
                .send<TestRunInformationSchema & T>()
        ).body
    }
}
