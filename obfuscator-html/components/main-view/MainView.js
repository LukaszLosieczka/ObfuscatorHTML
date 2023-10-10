import { Component } from "../Component";

export class MainView extends Component{
    
    getNode() {
        const html =
        `<div class="container py-4 px-3 mx-auto">
            <h1>HTML Obfuscator!</h1>
            <button class="btn btn-primary">Primary button</button>
        </div>`;
        const mainComponent = document.createElement("div");
        mainComponent.innerHTML = html;
        return mainComponent;
    }
}