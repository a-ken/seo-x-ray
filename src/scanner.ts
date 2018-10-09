import fs from 'fs';
import path from 'path';
import * as _ from 'lodash';
import * as cheerio from 'cheerio';
import makeDir from 'make-dir';
import { BaseRule, } from './rule';
import { Console } from 'console';

export class Scanner {
    private _rules: Array<BaseRule> = [];
    private _defects: Array<string> = [];

    get rules(): Array<BaseRule> {
        return _.cloneDeep(this._rules);
    }

    addRules(rules: Array<BaseRule>): void {
        rules.forEach((rule) => this.addRule(rule));
    }

    addRule(rule: BaseRule): void {
        let items = this._rules.filter(item => { 
            return item.constructor.name === rule.constructor.name 
        });
        if (items.length == 0) this._rules.push(rule);
    }

    removeRule(rule: BaseRule): void {
        let index = this._rules.findIndex(item => { 
            return item.constructor.name === rule.constructor.name
        });
        if (index >= 0) delete this._rules[index];
    }

    constructor(rules?: Array<BaseRule>) {
        if (rules) {
            this.addRules(rules);
        }
    }

    private _load(source: any): Promise<string> {
        let stream: fs.ReadStream;

        if (source === 'string' && fs.statSync(source).isFile()) {
            stream = fs.createReadStream(source);
        } else if (source instanceof fs.ReadStream) {
            stream = source;
        } else {
            throw new Error('Invalid input source');
        }

        return new Promise((resolve, reject) => {
            let html = '';
            stream.on('data', chunk => html += chunk);
            stream.on('end', () => {
                resolve(html) 
            });
            stream.on('error', err => { 
                reject(err && err.message ? err.message : 'Can not read stream')
            });
        });
    }

    async scan(filePath: string): Promise<void>;
    async scan(stream: fs.ReadStream): Promise<void>;
    async scan(source: any): Promise<void> {
        try {
            let html = await this._load(source);
            let $ = cheerio.load(html, {
                lowerCaseAttributeNames: true,
                lowerCaseTags: true,
            });
            for (let rule of this._rules) {
                let result = await rule.detect($);
                if (!result.pass) { 
                    this._defects.push(result.message);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    _save(source: any, message: string): Promise<void> {
        let stream: fs.WriteStream;

        if (typeof source === 'string') {
            if (!fs.existsSync(source)) {
                let dir = path.dirname(source);
                makeDir.sync(dir);
            }
            stream = fs.createWriteStream(source, { flags: 'a' }); // open file for appending
        } else if (source instanceof fs.WriteStream) {
            stream = source;
        } else {
            throw new Error('Invalid output source');
        }
        return new Promise((resolve, reject) => {
            stream.write(message, err => {
                if (err) reject(err && err.message ? err.message : 'Can not write stream');
            });
            stream.end(() => resolve());
        });
    }

    async output(filePath: string): Promise<void>
    async output(stream: fs.WriteStream): Promise<void>
    output(console: Console): void
    async output(source: any): Promise<void> {
        let message = this._defects.join('\r\n');
        if (message) message += '\r\n';

        if (source instanceof Console) {
            source.log(message);
        } else {
            try {
                await this._save(source, message);
            } catch (err) {
                console.error(err);
            }
        }
    }
}