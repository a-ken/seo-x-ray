"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const _ = __importStar(require("lodash"));
const cheerio = __importStar(require("cheerio"));
const make_dir_1 = __importDefault(require("make-dir"));
const console_1 = require("console");
class Scanner {
    constructor(rules) {
        this._rules = [];
        this._defects = [];
        if (rules) {
            this.addRules(rules);
        }
    }
    get rules() {
        return _.cloneDeep(this._rules);
    }
    addRules(rules) {
        rules.forEach((rule) => this.addRule(rule));
    }
    addRule(rule) {
        let items = this._rules.filter(item => {
            return item.constructor.name === rule.constructor.name;
        });
        if (items.length == 0)
            this._rules.push(rule);
    }
    removeRule(rule) {
        let index = this._rules.findIndex(item => {
            return item.constructor.name === rule.constructor.name;
        });
        if (index >= 0)
            delete this._rules[index];
    }
    _load(source) {
        let stream;
        if (source === 'string' && fs_1.default.statSync(source).isFile()) {
            stream = fs_1.default.createReadStream(source);
        }
        else if (source instanceof fs_1.default.ReadStream) {
            stream = source;
        }
        else {
            throw new Error('Invalid input source');
        }
        return new Promise((resolve, reject) => {
            let html = '';
            stream.on('data', chunk => html += chunk);
            stream.on('end', () => {
                resolve(html);
            });
            stream.on('error', err => {
                reject(err && err.message ? err.message : 'Can not read stream');
            });
        });
    }
    scan(source) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let html = yield this._load(source);
                let $ = cheerio.load(html, {
                    lowerCaseAttributeNames: true,
                    lowerCaseTags: true,
                });
                for (let rule of this._rules) {
                    let result = yield rule.detect($);
                    if (!result.pass) {
                        this._defects.push(result.message);
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    _save(source, message) {
        let stream;
        if (typeof source === 'string') {
            if (!fs_1.default.existsSync(source)) {
                let dir = path_1.default.dirname(source);
                make_dir_1.default.sync(dir);
            }
            stream = fs_1.default.createWriteStream(source, { flags: 'a' });
        }
        else if (source instanceof fs_1.default.WriteStream) {
            stream = source;
        }
        else {
            throw new Error('Invalid output source');
        }
        return new Promise((resolve, reject) => {
            stream.write(message, err => {
                if (err)
                    reject(err && err.message ? err.message : 'Can not write stream');
            });
            stream.end(() => resolve());
        });
    }
    output(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = this._defects.join('\r\n');
            if (message)
                message += '\r\n';
            if (source instanceof console_1.Console) {
                source.log(message);
            }
            else {
                try {
                    yield this._save(source, message);
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    }
}
exports.Scanner = Scanner;
