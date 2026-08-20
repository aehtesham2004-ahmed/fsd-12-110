
import { mkdir } from "fs/promises";

await mkdir("./upload/images", { recursive: true });

console.log("Folder created successfully");