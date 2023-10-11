import { getView } from './router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = document.querySelector('#app');
const contentView = new (getView())();

async function renderPage(){
  app.innerHTML = "";
  await contentView.loadData();
  app.innerHTML = contentView.getNode();
}

await renderPage();