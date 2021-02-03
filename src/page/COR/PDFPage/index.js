import React from 'react';

import {
    MDBContainer,
    // MDBScrollbar,
    MDBSideNavCat,
    MDBSideNavItem,
    MDBSideNavNav,
    MDBSideNav,
    MDBSideNavLink,
    MDBIcon,
    MDBBtn,
    MDBCol, MDBRow
} from "mdbreact";
import {Document, Outline, Page, pdfjs} from "react-pdf";
import file from './content.pdf'
import classes from './index.module.css'
import {url} from "../../../tool/fetch-help";
import {handleSyn} from "../../RRH/Component/speech-syn";
import {cancelSyn} from "../../RRH/Component/speech-syn";
import {AskQuestionCOR} from "./ask-question";


export class CORPdf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test:'',
            displayAll: false,
            file: null,
            numPages: null,
            pageNumber: null,
            pageWidth: null,
            passMethod: 'normal',
            render: true,
            renderAnnotations: false,
            renderMode: 'canvas',
            renderTextLayer: true,
            rotate: null,
            sideNavLeft: false,
            toggle:true,
            jumpPageNumber:null,
            col:'col-md-7',
            scale:1.0

        }
    }
    onDocumentLoadSuccess = ({ numPages }) =>
        this.setState({
            numPages,
            pageNumber: 11,
        });
    onPageRenderSuccess = page =>
        console.log('Rendered a page', page);

    onItemClick = ({ pageNumber }) =>
        this.setState({ pageNumber })

    //setFile = file => this.setState({ file })

    previousPage = () => this.changePage(-1);

    nextPage = () => this.changePage(1);

    changePage = offset =>
        this.setState(prevState => ({
            pageNumber: (prevState.pageNumber || 1) + offset,
        }));
    onLoadSuccess = (pdf)=>{
        return pdf.numPages
    };
    render() {
        cancelSyn();
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        const {
            displayAll,
            numPages,
            pageNumber,
            pageWidth,
            passMethod,
            render,
            renderAnnotations,
            renderMode,
            renderTextLayer,
            rotate,
        } = this.state;
        const file2 ='https://myedmaster.oss-us-east-1.aliyuncs.com/content.pdf';
        const pageProps = {
            className: 'custom-classname-page',
            onClick: (event, page) => console.log('Clicked a page', { event, page }),
            onRenderSuccess: this.onPageRenderSuccess,
            renderAnnotations,
            renderMode,
            renderTextLayer,
            width: pageWidth,
            customTextRenderer: textItem => (
                textItem.str
                    .split('ipsum')
                    .reduce((strArray, currentValue, currentIndex) => (
                        currentIndex === 0 ?
                            ([...strArray, currentValue]) :
                            // eslint-disable-next-line react/no-array-index-key
                            ([...strArray, <mark key={currentIndex}>ipsum</mark>, currentValue])
                    ), [])
            ),
        };
        const outerContainerStyle = {width:'auto', height: "792px" };
        const scrollContainerStyle = {width:'auto', maxHeight:'792px', overflow:'auto'}
        return (

            <div>
                <AskQuestionCOR/>
                <div className='d-flex row'>
                    {
                        this.state.toggle?(
                            <div style={outerContainerStyle} className="col-md-4 d-flex p-0">
                                <div> <div className='red-text h2 grey lighten-3 mb-0 pl-4'>Contents</div>
                                    {/* <MDBScrollbar> */}
                                        <div style= {scrollContainerStyle}>
                                            {
                                                render &&
                                                <Document
                                                    file={file2}
                                                >
                                                    <Outline
                                                        className="red-text p-0 grey lighten-3"
                                                        onItemClick={this.onItemClick}
                                                    />
                                                </Document>
                                            }
                                        </div>
                                    {/* </MDBScrollbar> */}
                                </div>
                                <div
                                    className={`red-text h4 grey lighten-3 mb-0 px-2`}
                                    style={{height:'830px'}}
                                    onClick={()=>{
                                        this.setState({
                                            toggle:false,
                                            col:'col-md-9',
                                            scale:1.4
                                        })
                                    }}
                                >
                                    <MDBIcon className={`${classes.arrow} ml-2`} style={{marginTop:'300px'}} icon="angle-double-left" />
                                </div>
                            </div>


                        ):(
                            <div
                                className={`red-text h4 grey lighten-3 mb-0 px-2`}
                                onClick={()=>{
                                    this.setState({
                                        toggle:true,
                                        col:'col-md-7',
                                        scale:1.0
                                    })
                                }}
                            >
                                <MDBIcon className={`${classes.arrow} ml-2`} style={{marginTop:'300px'}} icon="angle-double-right" />
                            </div>
                        )

                    }
                    <div className={`${this.state.col} mt-1`}>
                        <div className='text-center mb-1'>
                            <span>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</span>
                            <input
                                className='mx-2'
                                style={{width:'50px'}}
                                onChange={(e)=>{
                                    this.setState({
                                        jumpPageNumber:e.target.value
                                    })
                                }}/>
                            <button
                                onClick={()=>{
                                    if(this.state.jumpPageNumber){
                                        this.changePage(this.state.jumpPageNumber-this.state.pageNumber)
                                    }

                                }}
                            >Jump</button>
                            <button
                                className='mx-2'

                            >
                                <a href="https://myedmaster.oss-us-east-1.aliyuncs.com/content.pdf">
                                    <MDBIcon icon="arrow-down" className='mx-1 align-middle'/>
                                    Download PDF
                                </a>
                            </button>
                        </div>
                        <div className='d-flex'>
                            <div
                                // style={{backgroundColor:'#bdbdbd'}}
                                onClick={this.previousPage}
                                className='text-center grey lighten-1'

                            >
                                <div style={{height:'300px',width:'30px'}}></div>
                                <MDBIcon icon="angle-left" size='3x' />
                            </div>
                            <div>
                                {
                                    render &&
                                    <Document
                                        className="custom-classname-document"
                                        onItemClick={this.onItemClick}
                                        file={file2}
                                        onClick={(event, pdf) => console.log('Clicked a document', { event, pdf })}
                                        onLoadSuccess={this.onDocumentLoadSuccess}
                                        onLoadError={this.onDocumentLoadError}
                                        onSourceError={this.onDocumentLoadError}
                                        rotate={rotate}
                                    >
                                        {
                                            displayAll ?
                                                Array.from(
                                                    new Array(numPages),
                                                    (el, index) => (
                                                        <Page
                                                            {...pageProps}
                                                            inputRef={
                                                                (pageNumber === index + 1) ?
                                                                    (ref => ref && ref.scrollIntoView()) :
                                                                    null
                                                            }
                                                            key={`page_${index + 1}`}
                                                            pageNumber={index + 1}
                                                        />
                                                    ),
                                                ) :
                                                <Page
                                                    {...pageProps}
                                                    pageNumber={pageNumber || 1}
                                                    // width={800}
                                                    scale={this.state.scale}
                                                />
                                        }
                                    </Document>
                                }
                            </div>
                            <div
                                // style={{backgroundColor:'#bdbdbd'}}
                                onClick={this.nextPage}
                                className='text-center grey lighten-1'
                            >
                                <div style={{height:'300px',width:'30px'}}></div>
                                <MDBIcon icon="angle-right" size='3x' />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}
