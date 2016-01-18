var fs=require("fs");
var request=require("request");


module.exports = {
   pwd: function(file, done) {
   done(process.env.PWD);
},
   date: function(file, done) {
      done(new Date().toString());
   },
   ls: function(file, done) {
      var output = "";
      fs.readdir('.', function(err, files) {
      files.forEach(function(file) {
      output += file.toString() + "\n";
     })
     done(output);
  });
   },
   echo: function(str, done) {
      done(str.toString() + "\n");
   },
   cat: function(file, done) {
      fs.readFile(file, function(err, data) {
      if (err) throw err;
      done(data.toString() + "\n");
   });
},
   head: function(file,done) {
      fs.readFile(file, function(err, data) {
      if (err) throw err;
      var res="";
      data.toString().split("\n").slice(0,5).forEach(function(el){
         res+=el+"\n";
      });
      done(res);
   });
   },
   tail: function(file,done) {
      fs.readFile(file, function(err, data) {
      if (err) throw err;
      var res="";
      var arr=data.toString().split("\n");
      arr.slice(arr.length-5).forEach(function(el){
         res+=el+"\n";
      });
      done(res);
      });
   },
   sort: function(file,done) {
      fs.readFile(file, function(err, data) {
      if (err) throw err;
      var res="";
      data.toString().split("\n").slice(0).sort().forEach(function(el){
         res+=el+"\n";
      });
      done(res);
      });
   },
   wc: function(file,done) {
      fs.readFile(file, function(err, data) {
      if (err) throw err;
      done(data.toString().split("\n").length+"\n");
   });
   },
   uniq: function(file,done) {
      fs.readFile(file, function(err, data) {
      if (err) throw err;
      var res="";
      data.toString().split("\n").slice(0).sort().forEach(function(el,idx,arr){
         if (arr[idx]!=arr[idx-1])
            res+=el+"\n";
      });
      done(res);
      });
   },
   curl: function(url,done) {
      request(url,function(err,res,body) {
         if (!err && res.statusCode == 200) {
            done(body.toString());
         }
      });
   },
   find: function(dir,done) {
      var walk=function(dir) {
      var results = [];
      var list = fs.readdirSync(dir);
      list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(walk(file));
        else results.push(file);
    });
    return results;
}
   var str='';
   walk(dir).reduce(function(prev,el){return str+=el+"\n";})
   done(str);
}
};
