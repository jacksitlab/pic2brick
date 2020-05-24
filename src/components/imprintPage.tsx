import * as React from 'react'
import PageWrapper from './pageWrapper'
import { loadImprint } from 'services/assetService';
import MarkdownContentPage, { IMarkdownContentPageProps } from './markdownContentPage';


class ImprintPage extends MarkdownContentPage {

    public constructor(props: any) {
        super(props);
        loadImprint().then((response) => {
            this.setState({ content: response.data })
        }).catch((error) => {
            this.setState({ content: `${error}` })
        })
    }
}
export default ImprintPage