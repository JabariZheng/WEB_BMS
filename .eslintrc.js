// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-dupe-args": 2,//函数参数不能重复
    "no-empty": 1,//块语句中的内容不能为空
    "no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量
    "no-mixed-requires": [0, false],//声明时不能混用声明类型
    "no-redeclare": 2,//禁止重复声明变量
    "no-trailing-spaces": 1,//一行结束后面不要有空格
    "no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
    "camelcase": 2,//强制驼峰法命名
    "indent": [2, 4],//缩进风格
    "no-unused-vars": [2, {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    // 关闭语句强制分号结尾
    "semi": [0],
    //空行最多不能超过100行
    "no-multiple-empty-lines": [0, {"max": 100}],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
  }
}
