import React, { Component } from 'react'
import { useMediaQuery } from 'react-responsive';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'
import DPResume from '../images/resume/PittmanDeanta_Resume_Jan2023.pdf'

const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
pdfjs.GlobalWorkerOptions.workerSrc = url


export class Resume extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scale: 0.0
        };
    }
    componentDidMount() {
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        this.setState({ scale: mobile ? 0.5 : 2.0 });
        
    }

    render()
    {
        return (
            <div>
                <Document file={DPResume}>
                    <Page pageNumber={1} renderTextLayer={false} scale={this.state.scale} />
                </Document>
            </div>
                        
        )
    }
}; 