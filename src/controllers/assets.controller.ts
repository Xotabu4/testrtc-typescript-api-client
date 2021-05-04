import { definitions, paths } from "../../types/swagger";
import { BaseController } from "./base.controller";

// TODO: id is missing in documentation
type AssetWithId = Required<definitions["Asset"]> & { id: string }

export class AssetsController extends BaseController {
    async getAssets() {
        return (
            await this.preparedRequest()
                .url(`v1/assets`)
                .send<AssetWithId[]>()
        ).body
    }
    async getAsset(id: string | number) {
        return (
            await this.preparedRequest()
                .url(`v1/assets/${id}`)
                .send<AssetWithId>()
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
                .send<AssetWithId>()
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