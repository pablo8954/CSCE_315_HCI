import StitchRedirectCredential from "../StitchRedirectCredential";
export default class GoogleRedirectCredential implements StitchRedirectCredential {
    readonly redirectUrl?: string | undefined;
    readonly providerName: string;
    readonly providerType: string;
    constructor(redirectUrl?: string | undefined, providerName?: string, providerType?: string);
}
