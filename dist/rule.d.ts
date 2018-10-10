/// <reference types="cheerio" />
export interface RuleResult {
    pass: boolean;
    message: string;
}
export declare abstract class BaseRule {
    abstract readonly description: string;
    abstract detect($: CheerioStatic): Promise<RuleResult>;
}
declare class ImgWithoutAltAttrRule extends BaseRule {
    readonly description: string;
    detect($: CheerioStatic): Promise<RuleResult>;
}
declare class AWithoutRelAttrRule extends BaseRule {
    readonly description: string;
    detect($: CheerioStatic): Promise<RuleResult>;
}
declare class HeaderNoTitleRule extends BaseRule {
    readonly description: string;
    detect($: CheerioStatic): Promise<RuleResult>;
}
declare class HeaderNoMetaDescriptionsRule extends BaseRule {
    readonly description: string;
    detect($: CheerioStatic): Promise<RuleResult>;
}
declare class HeaderNoMetaKeywordsRule extends BaseRule {
    readonly description: string;
    detect($: CheerioStatic): Promise<RuleResult>;
}
declare class StrongMoreThanRule extends BaseRule {
    private limit;
    setLimit(limit: number): this;
    readonly description: string;
    detect($: CheerioStatic): Promise<RuleResult>;
}
declare class H1MoreThanOneRule extends BaseRule {
    readonly description: string;
    detect($: CheerioStatic): Promise<RuleResult>;
}
export declare const Rule: {
    imgWithoutAltAttr: ImgWithoutAltAttrRule;
    aWithoutRelAttr: AWithoutRelAttrRule;
    headerNoTitle: HeaderNoTitleRule;
    headerNoMetaDescriptions: HeaderNoMetaDescriptionsRule;
    headerNoMetaKeywords: HeaderNoMetaKeywordsRule;
    strongMoreThan: StrongMoreThanRule;
    h1MoreThanOne: H1MoreThanOneRule;
};
export {};
