"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRule {
}
exports.BaseRule = BaseRule;
class ImgWithoutAltAttrRule extends BaseRule {
    get description() {
        return 'Detect if any <img /> tag without alt attribute';
    }
    detect($) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { pass: true, message: '' };
            let elements = $('img:not([alt])');
            if (elements.length > 0) {
                result.pass = false;
                result.message = `There are ${elements.length} <img> tag without alt attribute`;
            }
            return result;
        });
    }
}
class AWithoutRelAttrRule extends BaseRule {
    get description() {
        return 'Detect if any <a /> tag without rel attribute';
    }
    detect($) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { pass: true, message: '' };
            let elements = $('img:not([rel])');
            if (elements.length > 0) {
                result.pass = false;
                result.message = `There are ${elements.length} <a> tag without rel attribute`;
            }
            return result;
        });
    }
}
class HeaderNoTitleRule extends BaseRule {
    get description() {
        return 'Detect if header doesn’t have <title> tag';
    }
    detect($) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { pass: true, message: '' };
            let elements = $('html title');
            if (elements.length == 0) {
                result.pass = false;
                result.message = `This HTML without <title> tag`;
            }
            return result;
        });
    }
}
class HeaderNoMetaDescriptionsRule extends BaseRule {
    get description() {
        return 'Detect if header doesn’t have <meta name="descriptions" … /> tag';
    }
    detect($) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { pass: true, message: '' };
            let elements = $('html meta[name="descriptions"]');
            if (elements.length == 0) {
                result.pass = false;
                result.message = `This HTML without <meta name="descriptions" /> tag`;
            }
            return result;
        });
    }
}
class HeaderNoMetaKeywordsRule extends BaseRule {
    get description() {
        return 'Detect if header doesn’t have <meta name="keywords" … /> tag';
    }
    detect($) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { pass: true, message: '' };
            let elements = $('html meta[name="keywords"]');
            if (elements.length == 0) {
                result.pass = false;
                result.message = `This HTML without <meta name="keywords" /> tag`;
            }
            return result;
        });
    }
}
class StrongMoreThanRule extends BaseRule {
    constructor() {
        super(...arguments);
        this.limit = 15;
    }
    setLimit(limit) {
        this.limit = limit;
        return this;
    }
    get description() {
        return 'Detect if there’re more than N <strong> tag in HTML';
    }
    detect($) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { pass: true, message: '' };
            let elements = $('strong');
            if (elements.length > this.limit) {
                result.pass = false;
                result.message = `This HTML have more than ${this.limit} <strong> tag`;
            }
            return result;
        });
    }
}
class H1MoreThanOneRule extends BaseRule {
    get description() {
        return 'Detect if a HTML have more than one <H1> tag';
    }
    detect($) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = { pass: true, message: '' };
            let elements = $('h1');
            if (elements.length > 1) {
                result.pass = false;
                result.message = `This HTML have more than one <h1> tag`;
            }
            return result;
        });
    }
}
exports.Rule = {
    imgWithoutAltAttr: new ImgWithoutAltAttrRule(),
    aWithoutRelAttr: new AWithoutRelAttrRule(),
    headerNoTitle: new HeaderNoTitleRule(),
    headerNoMetaDescriptions: new HeaderNoMetaDescriptionsRule(),
    headerNoMetaKeywords: new HeaderNoMetaKeywordsRule(),
    strongMoreThan: new StrongMoreThanRule(),
    h1MoreThanOne: new H1MoreThanOneRule(),
};
