/// <reference types="node" />
import fs from 'fs';
import { BaseRule } from './rule';
export declare class Scanner {
    private _rules;
    private _defects;
    readonly rules: Array<BaseRule>;
    addRules(rules: Array<BaseRule>): void;
    addRule(rule: BaseRule): void;
    removeRule(rule: BaseRule): void;
    constructor(rules?: Array<BaseRule>);
    private _load;
    scan(filePath: string): Promise<void>;
    scan(stream: fs.ReadStream): Promise<void>;
    private _save;
    output(filePath: string): Promise<void>;
    output(stream: fs.WriteStream): Promise<void>;
    output(console: Console): void;
}
