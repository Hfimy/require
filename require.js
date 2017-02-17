

'use strict';

const fs = require('fs');
const path = require('path');

function $require(id) {

    const filename = path.join(__dirname, id);
    //判断是否存在缓存
    $require.cache = $require.cache || {};
    if ($require.cache[filename]) {
        return $require.cache[filename].exports;
    }

    const dirname = path.dirname(filename);

    let code = fs.readFileSync(filename, 'utf8');

    let module = { id: filename, exports: {} };
    //exports实际上是module.exports的一个别名，当为module.exports重新赋值后，即切断了与exports的联系，推荐使用module.exports
    exports = module.exports;

    code = `
    //封装成自执行函数
    (function(exports,$require,module,__dirname,__filename){
        ${code};
    })(exports,$require,module,dirname,filename);`

    eval(code);

    //加入缓存
    $require.cache[filename] = module;
    return module.exports;

}
// setInterval(() => {
//     //清除缓存
//     if ($require.cache) {
//         Object.keys($require.cache).forEach((key) => {
//             delete $require.cache[key];
//         })
//     }
//     let date = $require('../module/date.js');
//     console.log(date.getTime());
// }, 1000)
require('../module/date.js');
const pa=path.join(__dirname,'../module/date.js');
console.log(require);