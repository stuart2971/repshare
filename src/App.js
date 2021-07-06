import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import Main from "./components/Main";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Main} />
                <Route path="/:haulID" component={Main} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
