import { MainView } from "./components/main-view/MainView";

const routes = {
    "/": MainView,
  };
  
  export function getView() {
    return routes[document.location.pathname];
  }