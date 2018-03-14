import React from "react";
import "../../style/table.scss";

export class Table extends React.Component {
    constructor(props){
        super();
        // tData = props.tableData,
        this.tData = [
            {"col1": "Number1", "col2": "Number2",
                "col3": "Number3", "col4": "Number4",
                "col5": "Number5", "col6": "Number6",
                "col7": "Number7", "col8": "Number8",
                "col9": "Number9", "col10": "Number10",
                "col11": "Text1",  "col12": "Text2",
                "col13": "Text3",  "col14": "Text4",
                "col15": "Text5",  "col16": "Text6",
                "col17": "Text7",  "col18": "Text8",
                "col19": "Text9",  "col20": "Text10",
                "col21": "Text11", "col22": "Text12",
                "col23": "Text13", "col24": "Text14",
                "col25": "Text15", "col26": "Text16",
                "col27": "Text17", "col28": "Text18",
                "col29": "Text19", "col30": "Text20",
                "col31": "01/01/2018",
                "col32": "AlphaNum1", "col33": "AlphaNum2",
                "col34": "AlphaNum3", "col35": "AlphaNum4",
                "col36": "AlphaNum5", "col37": "AlphaNum6",
                "col38": "AlphaNum7", "col39": "AlphaNum8",
                "col40": "AlphaNum9"
            },
            {"col1": "Number11", "col2": "Number12",
                "col3": "Number3", "col4": "Number4",
                "col5": "Number5", "col6": "Number6",
                "col7": "Number7", "col8": "Number8",
                "col9": "Number9", "col10": "Number10",
                "col11": "Text1 could be a very long long long long string",  "col12": "Text2",
                "col13": "Text3",  "col14": "Text4",
                "col15": "Text5",  "col16": "Text6",
                "col17": "Text7",  "col18": "Text8",
                "col19": "Text9",  "col20": "Text10",
                "col21": "Text11", "col22": "Text12",
                "col23": "Text13", "col24": "Text14",
                "col25": "Text15", "col26": "Text16",
                "col27": "Text17", "col28": "Text18",
                "col29": "Text19", "col30": "Text20",
                "col31": "01/01/2018",
                "col32": "AlphaNum1", "col33": "AlphaNum2",
                "col34": "AlphaNum3", "col35": "AlphaNum4",
                "col36": "AlphaNum5", "col37": "AlphaNum6",
                "col38": "AlphaNum7", "col39": "AlphaNum8",
                "col40": "AlphaNum9"
            },
            {"col1": "Number21", "col2": "Number22",
                "col3": "Number3", "col4": "Number4",
                "col5": "Number5", "col6": "Number6",
                "col7": "Number7", "col8": "Number8",
                "col9": "Number9", "col10": "Number10",
                "col11": "Text1 very long long long long string",  "col12": "Text2",
                "col13": "Text3",  "col14": "Text4",
                "col15": "Text5",  "col16": "Text6",
                "col17": "Text7",  "col18": "Text8",
                "col19": "Text9",  "col20": "Text10",
                "col21": "Text11", "col22": "Text12",
                "col23": "Text13", "col24": "Text14",
                "col25": "Text15", "col26": "Text16",
                "col27": "Text17", "col28": "Text18",
                "col29": "Text19", "col30": "Text20",
                "col31": "01/01/2018",
                "col32": "AlphaNum1", "col33": "AlphaNum2",
                "col34": "AlphaNum3", "col35": "AlphaNum4",
                "col36": "AlphaNum5", "col37": "AlphaNum6",
                "col38": "AlphaNum7", "col39": "AlphaNum8",
                "col40": "AlphaNum9"
            },
            {"col1": "Number31", "col2": "Number32",
                "col3": "Number3", "col4": "Number4",
                "col5": "Number5", "col6": "Number6",
                "col7": "Number7", "col8": "Number8",
                "col9": "Number9", "col10": "Number10",
                "col11": "Text1",  "col12": "Text2",
                "col13": "Text3",  "col14": "Text4",
                "col15": "Text5",  "col16": "Text6",
                "col17": "Text7",  "col18": "Text8",
                "col19": "Text9",  "col20": "Text10",
                "col21": "Text11", "col22": "Text12",
                "col23": "Text13", "col24": "Text14",
                "col25": "Text15", "col26": "Text16",
                "col27": "Text17", "col28": "Text18",
                "col29": "Text19", "col30": "Text20",
                "col31": "01/01/2018",
                "col32": "AlphaNum1", "col33": "AlphaNum2",
                "col34": "AlphaNum3", "col35": "AlphaNum4",
                "col36": "AlphaNum5", "col37": "AlphaNum6",
                "col38": "AlphaNum7", "col39": "AlphaNum8",
                "col40": "AlphaNum9"
            }
        ];
        // tLinks = props.tableLinks;
        this.tLinks = {
            "1":
                {
                    "col11": "https://www.threatmetrix.com/",
                    "col12": "https://www.google.com/"
                },
            "3":
                {
                    "col11": "https://www.threatmetrix.com/",
                    "col12": "https://www.facebook.com/"
                }
        };
        this.fieldTitles = Object.keys(this.tData[0]);
        this.resizingCol = undefined;
        this.resizingColOffset = 0;
        this.selectColStart = undefined;
        this.selectColEnd = undefined;
    }

    componentDidMount(){
        if(this.tLinks != null){
            //add hyperlinks after table is rendered
            this.addLinks();
        }
        //first column is locked, can't resize width
        document.querySelector("th > span.grip").classList.remove("grip");

        document.addEventListener('mousemove', (e) => {
            if(this.resizingCol){
                this.resizingCol.style.width = this.resizingColOffset + e.pageX + "px";
            }
        });
        document.addEventListener('mouseup', () => {
            this.resizingCol = undefined;
        });
    }

    selectColumns(e){
        //remove previous selection
        this.removeHighlight();

        //check if shift key is pressed
        if(this.selectColStart && e.shiftKey){
            this.selectColEnd = e.currentTarget.parentNode.cellIndex;
            let min = Math.min(this.selectColStart, this.selectColEnd),
                max = Math.max(this.selectColStart, this.selectColEnd);

            for(let col = min; col <= max; col++){
                this.addHighlight(col);
            }
        }else{
            this.selectColStart = e.currentTarget.parentNode.cellIndex;
            this.addHighlight(this.selectColStart);
        }
    }

    columnResizeMouseDown(e){
        this.removeHighlight();
        this.resizingCol = e.currentTarget.parentNode;
        this.resizingColOffset = e.currentTarget.parentNode.offsetWidth - e.pageX;
    }

    addLinks(){
        for(let rowID in this.tLinks){
            let row, colIndex, cell, textNode, newLink;
            if(this.tLinks.hasOwnProperty(rowID)){
                //find the row which includes hyperlink(s)
                row = this.tLinks[rowID];
                Object.keys(row).map((fieldTitle)=> {
                    //find the column which has a hyperlink
                    colIndex = this.fieldTitles.indexOf(fieldTitle) + 1;
                    //get the table cell needs hyperlink
                    cell = document.getElementsByClassName("table-row")[rowID -1].childNodes[colIndex];
                    textNode = cell.childNodes[0];
                    newLink = document.createElement("a");
                    newLink.href = this.tLinks[rowID][fieldTitle];
                    cell.replaceChild(newLink, textNode);
                    newLink.appendChild(textNode);
                });
            }
        }
    }


    addHighlight(colIndex){
        document.querySelectorAll(".table-row").forEach((node) => {
            node.children[colIndex].className += "high-lighted";
        });
    }

    removeHighlight(){
        document.querySelectorAll("td").forEach((element) => {
            element.classList.remove("high-lighted");
        });
    }

    render(){
        return (
            <div className="wrapper">
                <table className="table table-bordered">
                    <thead>
                    <tr className="table-header">
                        <th>
                            <span className="col-title"
                                  onClick={this.selectColumns.bind(this)}>ID
                            </span>
                            <span className="grip"
                                  onMouseDown={this.columnResizeMouseDown.bind(this)}>
                                        &nbsp;
                            </span>
                        </th>
                        {
                            this.fieldTitles.map((fieldTitle, index) => {
                                return (
                                    <th key={index} >
                                    <span className="col-title"
                                          onClick={this.selectColumns.bind(this)}>{fieldTitle}
                                    </span>
                                        <span className="grip"
                                              onMouseDown={this.columnResizeMouseDown.bind(this)}>
                                        &nbsp;
                                    </span>
                                    </th>
                                );
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.tData.map((obj, index) => {
                            return (
                                <tr key={index} className="table-row">
                                    <td onClick={this.removeHighlight.bind(this)}>
                                        {index+1}
                                    </td>
                                    {
                                        this.fieldTitles.map((fieldTitle, key) => {
                                            return (
                                                <td
                                                    key={key} title={obj[fieldTitle]}
                                                    onClick={this.removeHighlight.bind(this)}>
                                                    {obj[fieldTitle]}
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );

    };
}