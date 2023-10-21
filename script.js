
import { client } from "https://cdn.jsdelivr.net/npm/@gradio/client/+esm";
//import { client } from "./node_modules/@gradio/client/dist/index.js";


// Wrapping the async operations inside an async function
async function runApp() {

    console.log("Fetching image...");
    const response_0 = await fetch("images/5.jpg");
    console.log("Image fetched!");

    const exampleImage = await response_0.blob();
    console.log("Converted to blob!");

    console.log("Initializing Gradio client...");
    const app = await client("https://j3nsykes-llava-v1api.hf.space/--replicas/kckqn/");

    const app_info = await app.view_api();
    console.log(app_info);

    console.log("Gradio client initialized!");
    console.log("Predicting...");


    let message = "Describe this image?";
    let history = [];
    let crop = "crop";
    let status = "";
    let data = null;
    function callback(msg) {
        console.log("call back...");
        if (msg.type == "data") {
            console.log(msg.data[0]);
        }
        if (msg.type == "data") {
            console.log(msg.data[0]);
        }
    }

    app.submit(7, [message, exampleImage, crop])
        .on("status", (evt) => {
            status = evt.stage;
            callback({ type: evt.type, data: evt.state });
        })
        .on("data", (evt) => {
            data = evt.data[0];
            callback({ type: evt.type, data: evt.data[0] });
        });
}



console.log("Script loaded");
document.getElementById("runAppButton").addEventListener("click", runApp);

