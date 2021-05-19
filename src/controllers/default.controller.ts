import { definitions, paths } from "../../types/swagger";
import { BaseController } from "./base.controller";

type Usage = {
    qualityRtc: {
        conductedTests: number;
        totalTests: number;
        nextCycleDate: string;
    };
}

export class DefaultController extends BaseController {
    async dialin(data: definitions['DialInData']) {
        return (
            await this.preparedRequest()
                .url(`dial-in`)
                .method('POST')
                .body(data)
                .send<paths['/dial-in']['post']['responses']['201']['schema']>()
        ).body
    }
    async usage() {
        return (
            await this.preparedRequest()
                .url(`usage`)
                .send<Usage>()
        ).body
    }
}