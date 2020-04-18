import { StitchAppRoutes } from "mongodb-stitch-core-sdk";
import StitchBrowserAppAuthRoutes from "./StitchBrowserAppAuthRoutes";
export default class StitchBrowserAppRoutes extends StitchAppRoutes {
    readonly authRoutes: StitchBrowserAppAuthRoutes;
    constructor(clientAppId: string);
}
