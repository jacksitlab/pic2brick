import * as React from 'react'
import PageWrapper from './pageWrapper'
import { loadPrivacy } from 'services/assetService';
import MarkdownContentPage from './markdownContentPage';


class PrivacyPage extends MarkdownContentPage {

    public constructor(props: any) {
        super(props);
        loadPrivacy().then((response) => {
            this.setState({ content: response.data })
        }).catch((error) => {
            this.setState({ content: `${error}` })
        })
    }
}
export default PrivacyPage