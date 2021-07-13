import { definitions, paths } from "../../types/swagger";
import { BaseController } from "./base.controller";

export class QualityRtcController extends BaseController {
    async createQualityRtcInvite(data: definitions['QualityRTCInviteRequest']) {
        return (
            await this.preparedRequest()
                .url(`qualityrtc-invite`)
                .method('POST')
                .body(data)
                .send<paths['/qualityrtc-invite']['post']['responses']['200']['schema']>()
        ).body
    }
}