import { Component } from "../Component";

export class MainView extends Component{
    
    getNode() {
        const html =
        `<div class="container">
            <h1 class="text-center mt-5">Obfuskator i detektor obfuskacji kodu źródłowego programów w HTML</h3>
            <form class="mt-5">
                <div class="form-group mb-3">
                    <label for="htmlInput">Kod HTML</label>
                    <textarea type="text" class="form-control" id="htmlInput" style="resize:none" rows="10" placeholder="Skopiuj swój kod HTML"></textarea>
                </div>
            </form>
            <div class="text-center">
                <button class="btn btn-primary">Zaciemnij HTML</button>
            </div>
            <textarea type="text" class="form-control mt-3" id="htmlInput" style="resize:none" rows="10" placeholder="Rezultat" disabled></textarea>
        </div>`;
        return html;
    }
}