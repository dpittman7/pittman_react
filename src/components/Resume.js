import React, { Component } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import DPResume from '../images/resume/PittmanDeanta_Resume_Jan2023.pdf'



export class Resume extends Component {


    

    render()
    {
        return (
            <div>
                <Document file={DPResume}>
                    <Page pageNumber={1} renderTextLayer={false} scale={2.0} />
                </Document>
            </div>
                        
        )
    }
}; 