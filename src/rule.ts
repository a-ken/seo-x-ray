import * as cheerio from 'cheerio';

export interface RuleResult {
    pass: boolean;
    message: string;
}

export abstract class BaseRule {
    abstract get description(): string;
    abstract async detect($: CheerioStatic): Promise<RuleResult>;
}

class ImgWithoutAltAttrRule extends BaseRule {
    get description(): string {
        return 'Detect if any <img /> tag without alt attribute';
    }

    async detect($: CheerioStatic): Promise<RuleResult> {
        let result: RuleResult = { pass: true, message: '' };
        let elements = $('img:not([alt])');
        if (elements.length > 0) {
            result.pass = false;
            result.message = `There are ${elements.length} <img> tag without alt attribute`;
        }
        return result;
    }
}

class AWithoutRelAttrRule extends BaseRule {
    get description(): string {
        return 'Detect if any <a /> tag without rel attribute';
    }

    async detect($: CheerioStatic): Promise<RuleResult> {
        let result: RuleResult = { pass: true, message: '' };
        let elements = $('img:not([rel])');
        if (elements.length > 0) {
            result.pass = false;
            result.message = `There are ${elements.length} <a> tag without rel attribute`;
        }
        return result;
    }
}

class HeaderNoTitleRule extends BaseRule {
    get description(): string {
        return 'Detect if header doesn’t have <title> tag';
    }

    async detect($: CheerioStatic): Promise<RuleResult> {
        let result: RuleResult = { pass: true, message: '' };
        let elements = $('html title');
        if (elements.length == 0) {
            result.pass = false;
            result.message = `This HTML without <title> tag`;
        }
        return result;
    }
}

class HeaderNoMetaDescriptionsRule extends BaseRule {
    get description(): string {
        return 'Detect if header doesn’t have <meta name="descriptions" … /> tag';
    }

    async detect($: CheerioStatic): Promise<RuleResult> {
        let result: RuleResult = { pass: true, message: '' };
        let elements = $('html meta[name="descriptions"]');
        if (elements.length == 0) {
            result.pass = false;
            result.message = `This HTML without <meta name="descriptions" /> tag`;
        }
        return result;
    }
}

class HeaderNoMetaKeywordsRule extends BaseRule {
    get description(): string {
        return 'Detect if header doesn’t have <meta name="keywords" … /> tag';
    }

    async detect($: CheerioStatic): Promise<RuleResult> {
        let result: RuleResult = { pass: true, message: '' };
        let elements = $('html meta[name="keywords"]');
        if (elements.length == 0) {
            result.pass = false;
            result.message = `This HTML without <meta name="keywords" /> tag`;
        }
        return result;
    }
}

class StrongMoreThanRule extends BaseRule {
    private limit = 15;

    setLimit(limit: number) {
        this.limit = limit;
        return this;
    }

    get description(): string {
        return 'Detect if there’re more than N <strong> tag in HTML';
    }

    async detect($: CheerioStatic): Promise<RuleResult> {
        let result: RuleResult = { pass: true, message: '' };
        let elements = $('strong');
        if (elements.length > this.limit) {
            result.pass = false;
            result.message = `This HTML have more than ${this.limit} <strong> tag`;
        }
        return result;
    }
}

class H1MoreThanOneRule extends BaseRule {
    get description(): string {
        return 'Detect if a HTML have more than one <H1> tag';
    }

    async detect($: CheerioStatic): Promise<RuleResult> {
        let result: RuleResult = { pass: true, message: '' };
        let elements = $('h1');
        if (elements.length > 1) {
            result.pass = false;
            result.message = `This HTML have more than one <h1> tag`;
        }
        return result;
    }
}

export const Rule = {
    imgWithoutAltAttrRule: new ImgWithoutAltAttrRule(),
    aWithoutRelAttrRule: new AWithoutRelAttrRule(),
    headerNoTitleRule: new HeaderNoTitleRule(),
    headerNoMetaDescriptionsRule: new HeaderNoMetaDescriptionsRule(),
    headerNoMetaKeywordsRule: new HeaderNoMetaKeywordsRule(),
    strongMoreThanRule: new StrongMoreThanRule(),
    h1MoreThanOneRule: new H1MoreThanOneRule(),
}