//DOM -> Document Object Model
import { EventEmitter } from "events";

const button = new EventEmitter();

button.on("click", () => {
    console.log("Task 1");
})

button.emit("click" ,() => {
    console.log("Task 2");
});

button.emit("click");
