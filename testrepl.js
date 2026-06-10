const readline = require('readline');
const vm = require('vm');

// 创建一个上下文对象，用来存储变量（相当于全局作用域）
const context = {
    message: '你好，这是自定义上下文！'
};

// 1. 创建 readline 接口 (负责 Read 和 Print 的一部分)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '简易 REPL > '
});

console.log('简易 REPL 已启动 (输入 .exit 退出)');
rl.prompt();

// 2. 监听行输入
rl.on('line', (input) => {
    let message = '这是一个测试消息';
    const cmd = input.trim();

    // 处理退出命令
    if (cmd === '.exit') {
        rl.close();
        process.exit();
    }

    const testInnerFunc = async (a, b) => {
        console.log(message);

        const gen =  testAnotherInnerFunc();
        console.log([...gen]);
        return a + b;
    };

    const result = testInnerFunc(1, 2);
    console.log('testInnerFunc(1, 2) =', result);

    try {
        // --- Eval (求值) ---
        // 使用 vm.runInNewContext 在指定上下文中执行代码
        const result = vm.runInNewContext(cmd, context);

        // --- Print (打印) ---
        // 只有当结果不是 undefined 时才打印
        if (result !== undefined) {
            console.log(result);
        }
    } catch (err) {
        // 错误处理
        console.error(err.message);
    }

    // --- Loop (循环) ---
    // 再次显示提示符，等待下一次输入
    rl.prompt();
});


let innerMessage = '这是内部函数的消息';
 function* testAnotherInnerFunc() {
     const anotherInnerMessage = 'testAnotherInnerFunc';
    console.log(innerMessage);
    console.log(anotherInnerMessage);
    yield* ['1', '2'];
    console.log('--------------testAnotherInnerFunc-------------');
}
