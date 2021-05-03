import { definitions, paths } from "../../types/swagger";
import { BaseController } from "./base.controller";

export class AssetsController extends BaseController {
    async getAssets() {
        return (
            await this.preparedRequest()
                .url(`v1/assets`)
                .send<paths['/assets']['get']['responses']['200']['schema']>()
        ).body
    }
    async getAsset(id: string | number) {
        return (
            await this.preparedRequest()
                .url(`v1/assets/${id}`)
                .send<Required<paths['/assets/{assetId}']['get']['responses']['200']['schema']>>()
        ).body
    }
    async createAsset(newAsset: definitions['Asset']) {
        return (
            await this.preparedRequest()
                .url(`v1/assets`)
                .method('POST')
                .body(newAsset)
                .send<paths['/assets']['post']['responses']['201']['schema']>()
        ).body
    }
    async updateAsset(id: number | string, newAssetData: Partial<definitions['Asset']>) {
        return (
            await this.preparedRequest()
                .url(`v1/assets/${id}`)
                .method('PUT')
                .body(newAssetData)
                .send<Required<paths['/assets/{assetId}']['put']['responses']['200']['schema']>>()
        ).body
    }
    async deleteAsset(id: number | string) {
        return (
            await this.preparedRequest()
                .url(`v1/assets/${id}`)
                .method('DELETE')
                .send<paths['/assets/{assetId}']['delete']['responses']['200']['schema']>()
        ).body
    }
}