import { writeFile, appendFile, readFile } from "fs/promises";

await writeFile("hello.txt", "JS is easy");

await appendFile("hello.txt", "\nJS is much easier than others");

const content = await readFile("hello.txt", "utf-8");

console.log(content);
