var fs=require("fs");
var request=require("request");


module.exports = {
   pwd: function(stdin,file, done) {
      done(process.env.PWD);
   },
   date: function(stdin,file, done) {
      done(new Date().toString());
   },
   ls: function(stdin,file, done) {
      var output = "";
      fs.readdir('.', function(err, files) {
         files.forEach(function(file) {
            output += file.toString() + "\n";
         })
         done(output);
      });
   },
   echo: function(stdin, str, done) {
      if(stdin) str = stdin;
      done(str.toString());
   },
   cat: function(stdin,file, done) {

      if(stdin){
         done(stdin);
      }
      else { 
         fs.readFile(file, function(err, data) {
            if (err) throw err;
            done(data.toString());
         });
      }
   },
   head: function(stdin,file,done) {

      if(stdin){
        realCallback(stdin);
     }
     else {
        fs.readFile(file, function(err, data) {
         if (err) throw err;
         realCallback(data);
      }); 
     } 

     function realCallback(data){
      var res="";
      data.toString().split("\n").slice(0,5).forEach(function(el){
         res+=el+"\n";
      });
      done(res);
   };          
},
tail: function(stdin,file,done) {

   if(stdin){
      realCallback(stdin);
   }
   else{
      fs.readFile(file, function(err, data) {
         if (err) throw err;
         realCallback(data.toString());
      });

   }
   function realCallback(data){
      var res="";
      var arr=data.split("\n");
      arr.slice(arr.length-5).forEach(function(el){
         res+=el+"\n";
      });
      done(res);   
   }
   


},
sort: function(stdin,file,done) {

   if(stdin){
      realCallback(stdin);
   }
   else{
      fs.readFile(file, function(err, data) {
         if (err) throw err;
         realCallback(data.toString());
      });   
   }

   function realCallback(data){
      var res="";
      data.toString().split("\n").slice(0).sort().forEach(function(el){
         res+=el+"\n";
      });
      done(res);
   }
   
},
wc: function(stdin,file,done) {
   if(stdin){
      done(stdin.split("\n").length)
   }
   else{
      fs.readFile(file, function(err, data) {
         if (err) throw err;
         done(data.toString().split("\n").length);
      });   
   }
   
},
uniq: function(stdin,file,done) {

   if(stdin){
      realCallback(stdin);
   }
   else{
      fs.readFile(file, function(err, data) {
         if (err) throw err;
         realCallback(data.toString());
      });   
   }

   function realCallback(data){
      var res="";
      data.toString().split("\n").slice(0).sort().forEach(function(el,idx,arr){
         if (arr[idx]!=arr[idx-1])
            res+=el+"\n";
      });
      done(res);
   }
   

   
},
curl: function(stdin,url,done) {

   if(stdin) url = stdin; //??? is stdin expecting contents or URL

   request(url,function(err,res,body) {
      if (!err && res.statusCode == 200) {
         done(body.toString());
      }
   });
},
find: function(stdin,dir,done) {

   if(stdin) dir = stdin;

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
