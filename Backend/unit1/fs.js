const fs=require("fs");
//  READS THE FILE CONTENT AND PRINT IT
//async-non blocking-uses callbacks
fs.readFile("file.txt","utf-8",(err,data)=>{
    if(err) return console.error(err);
    console.log(data);
})
// sync-line by line execution-blocks execution
const k=fs.readFileSync("file.txt","utf-8");
console.log(k);

//WRITE IN FILE
//async
const content="yellow";
fs.writeFile("file.txt",content,(err)=>{
    if(err)console.error(err);
    console.log("written file")
})
//sync
fs.writeFileSync("file.txt",content);
