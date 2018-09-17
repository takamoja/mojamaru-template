'use strict';

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const glob = require('glob');
const makeDir = require('make-dir');

const srcDir = `${process.cwd()}/src/ejs`;
const publicDir = `${process.cwd()}/public`;

glob(
    '**/*.ejs',
    {
        cwd: srcDir,
        ignore: '**/_*.ejs',
    },
    (er, files) => {
        for (let fileName of files) {
            convert(fileName, srcDir, publicDir);
        }
    }
);

const convert = (fileName, srcDir, publicDir) => {
    ejs.renderFile(path.resolve(srcDir, fileName), (err, str) => {
        if (err) {
            console.log(err);
            return;
        }

        const publicPath = path.resolve(publicDir, fileName);
        makeDir(path.dirname(publicPath)).then(() => {
            const htmlPath = path.format({
                dir: path.dirname(publicPath),
                name: path.basename(publicPath, '.ejs'),
                ext: '.html',
            });
            console.log(htmlPath);
            fs.writeFile(htmlPath, str, () => { });
        });
    });
};
