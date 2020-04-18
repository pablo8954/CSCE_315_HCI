import { StitchAppAuthRoutes } from "mongodb-stitch-core-sdk";
import StitchRedirectCredential from "../providers/StitchRedirectCredential";
export default class StitchBrowserAppAuthRoutes extends StitchAppAuthRoutes {
    constructor(clientAppId: string);
    getAuthProviderRedirectRoute(credential: StitchRedirectCredential, redirectUrl: string, state: string, deviceInfo: Record<string, any>): string;
    getAuthProviderLinkRedirectRoute(credential: StitchRedirectCredential, redirectUrl: string, state: string, deviceInfo: Record<string, any>): string;
    private uriEncodeObject;
}
