import { readFile } from "fs/promises";

const readData = (filename)=>{
    try{
    const content = readFile(filename, "utf-8");
    return content;
} catch (e) {
  console.log(e.message);
  console.log("File not found");  
} finally {
    console.log("Read data finished");
}



const writeData = (filename,content)=>{
    await writeFile(filename,content);
}
const appendData = (filename,content)=>{
    await appendFile(filename,content);
}
// if a function uses await then it should be declared as async function
const data = await readData("file1.js");
console.log(data);