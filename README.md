# SEO X Ray

## Getting Started

### Installation
`npm i git+https://github.com/a-ken/seo-x-ray.git`


### Example Code

```js
const { Rule, Scanner } = require('seo-x-ray');
const fs = require('fs');

(async () => {
    try {
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
        await scanner.output(fs.createWriteStream(__dirname + '/output1.txt', { flags: 'w+' }));
        await scanner.output(__dirname + '/output2.txt');
    } catch (err) {
        console.error(err);
    }
})();
```