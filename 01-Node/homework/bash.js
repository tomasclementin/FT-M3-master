const commands = require('./commands/index.js');

const print = function(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
};

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
    let args = data.toString().trim().split(' ');
    let cmd = args.shift();
    if (commands[cmd]) {
        commands[cmd](args, print);
    }
    else {
        console.log('command not found');
        process.stdout.write('\nprompt > ');
    };
});