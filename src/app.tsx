import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/jquery/dist/jquery.min.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/github-fork-ribbon-css/gh-fork-ribbon.css'
import './app.css'
import HomePage from 'components/homePage';
import EditorPage from 'components/editorPage';
import ImprintPage from 'components/imprintPage';
import PrivacyPage from 'components/privacyPage';
import DocumentationPage from 'components/docPage';
import PageWrapper from 'components/pageWrapper';

export const globals = {
    arrowWidthBig: 50,
    arrowWidthSmall: 25,
    getGalleryLink(catId: string, page: number) {
        return `/g/${catId}/${page}`
    },
    //usage: getreqfullscreen().call(targetelement) // open full screen on targetelement
    getreqfullscreen() {
        var root = document.documentElement
        return root.requestFullscreen;// || root.webkitRequestFullscreen || root.mozRequestFullScreen || root.msRequestFullscreen
    }
}
export function getGalleryPageUrl(cat: string, page: number = 1): string {
    return `${window.origin}/#/g/${cat}/${page}`;
}
export function getLoginPageUrl(): string {
    return `${window.origin}/#/login`;
}
const NotFoundPage = () => {
    return <PageWrapper><div className="container"><span>Page Not Found</span></div></PageWrapper>
}

class App extends React.Component {

    componentDidMount() {

    }
    render() {
        return (

            <HashRouter>
                <Switch>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/editor" component={EditorPage} exact />
                    <Route path="/documentation" component={DocumentationPage} exact />
                    <Route path="/imprint" component={ImprintPage} exact />
                    <Route path="/privacy" component={PrivacyPage} exact />

                    <Route path="/" component={NotFoundPage} />
                </Switch>
            </HashRouter>


        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
