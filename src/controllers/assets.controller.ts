import { definitions, paths } from "../../types/swagger";
import { BaseController } from "./base.controller";

export class AssetsController extends BaseController {
    async getAssets() {
        return (
            await this.preparedRequest()
                .url(`assets`)
                .send<paths['/assets']['get']['responses']['200']['schema']>()
        ).body
    }
    async createAsset(newAsset) {
        return (
            await this.preparedRequest()
                .url(`assets`)
                .method('POST')
                .body(newAsset)
                .send<paths['/assets']['post']['responses']['201']['schema']>()
        ).body
    }
    async updateAsset(id: number | string, newAssetData: Partial<definitions['Asset']>) {
        return (
            await this.preparedRequest()
                .url(`assets/${id}`)
                .method('PUT')
                .body(newAssetData)
                .send<paths['/assets']['post']['responses']['201']['schema']>()
        ).body
    }
}