var commands=require("./commands");
var cmdList=[];

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
   data.toString().trim().split(/\s*\|\s*/g).forEach(function(el){cmdList.push(el.split(" "));}); // remove the newline
   console.log(cmdList);

  process.stdout.write('You typed: ' + cmdList+"\n");

  var toRun=cmdList.shift();
  commands[toRun[0]].call(process,toRun[1],done);
});

function done(out) {
   if (!cmdList.length) {
      process.stdout.write(out);
      process.stdout.write('\nprompt > ');
   } else {
      toRun=cmdList.shift();
      commands[toRun[0]].call(process,out,done);
   }
}
