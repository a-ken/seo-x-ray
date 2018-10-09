import { Rule, RuleResult, Scanner } from './../src';
import fs from 'fs';

(async () =>{
    const scanner = new Scanner([
        Rule.imgWithoutAltAttr,
        Rule.aWithoutRelAttr,
        Rule.headerNoTitle,
        Rule.headerNoMetaDescriptions,
        Rule.headerNoMetaKeywords,
    ]);
    scanner.addRule(Rule.strongMoreThan.setLimit(15));
    scanner.addRule(Rule.h1MoreThanOne);

    await scanner.scan(fs.createReadStream(__dirname + '/test.html'))
    await scanner.output(console);
    await scanner.output(fs.createWriteStream(__dirname + '/../output/output1.txt', { flags: 'w+' }));
    await scanner.output(__dirname + '/../output/output2.txt');
})();