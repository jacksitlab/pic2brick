import * as React from 'react'
import PageWrapper from './pageWrapper';
import { ResponseData } from 'services/restService';
import * as marked from 'marked';
import * as hljs from 'highlight.js';
const defaultRenderer = new marked.Renderer();
defaultRenderer.link = (href, title, text) => (
    `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`
);

export interface IMarkdownContentPageProps {
    loadFunction(): Promise<ResponseData<string>>;
}
export interface IMarkdownContentPageState {
    content: string | null;
}
class MarkdownContentPage extends React.Component<any, IMarkdownContentPageState>{

    public constructor(props: any) {
        super(props);
        this.state = { content: null }
    }
    render() {
        const markedOptions: marked.MarkedOptions = {
            gfm: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            langPrefix: 'hljs ',
            ...({}),
            highlight: (code, lang) => {
                if (!!(lang && hljs.getLanguage(lang))) {
                    return hljs.highlight(lang, code).value;
                }
                return code;
            }
        };
        const className = "about-table"
        const style: React.CSSProperties = {};

        const html = (marked(this.state.content || 'loading', { renderer: markedOptions && markedOptions.renderer || defaultRenderer }));
        return <PageWrapper><div className="container-fluid">
            <div className="row">
                <div className="col-10 offset-1 my-1">
                    <div dangerouslySetInnerHTML={{ __html: html }}
                        className={className}
                        style={style}
                    ></div></div></div></div></PageWrapper>
    }
}
export default MarkdownContentPage