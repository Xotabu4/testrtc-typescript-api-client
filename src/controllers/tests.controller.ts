import type { definitions, paths } from "../../types/swagger";
import { BaseController } from "./base.controller";

export class TestsController extends BaseController {
    /**
     * @param newTest allowed to contain not all fields
     */
    async createTest(newTest: Partial<definitions['Test']>) {
        return (
            await this.preparedRequest()
                .url(`tests`)
                .method('POST')
                .body(newTest)
                .send<paths['/tests']['post']['responses']['200']['schema'] & { id: string }>()
        ).body
    }
    async getTest(id: number | string) {
        return (
            await this.preparedRequest()
                .url(`tests/${id}`)
                .send<definitions['TestMinimized']>()
        ).body
    }
    async getTests() {
        return (
            await this.preparedRequest()
                .url('tests')
                .send<definitions['TestMinimized'][]>()
        ).body
    }
    async updateTest(id: number | string, newTestData: Partial<definitions['Test']>) {
        return (
            await this.preparedRequest()
                .url(`tests/${id}`)
                .method('PUT')
                .body(newTestData)
                .send<paths['/tests/{testId}']['put']['responses']['200']['schema']>()
        ).body
    }
    async deleteTest(id: string | number) {
        return (
            await this.preparedRequest()
                .url(`tests/${id}`)
                .method('DELETE')
                .send<paths['/tests/{testId}']['delete']['responses']['200']['schema']>()
        ).body
    }
    async runTest(id: number | string, runOptions: definitions['TestRunParameters']) {
        return (
            await this.preparedRequest()
                .url(`tests/${id}/run`)
                .method('POST')
                .body(runOptions)
                .send<paths['/tests/{testId}/run']['post']['responses']['200']['schema']>()
        ).body
    }
};
