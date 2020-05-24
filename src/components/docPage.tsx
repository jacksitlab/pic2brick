import * as React from 'react'
import PageWrapper from './pageWrapper'
import MarkdownContentPage from './markdownContentPage';
import { loadDocumentation } from 'services/assetService';


class DocumentationPage extends MarkdownContentPage {

    public constructor(props: any) {
        super(props);
        loadDocumentation().then((response) => {
            this.setState({ content: response.data })
        }).catch((error) => {
            this.setState({ content: `${error}` })
        })
    }
}
export default DocumentationPage