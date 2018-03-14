import React from "react";
import {render} from "react-dom";
import {Table} from "./component/Table";

class App extends React.Component {
    constructor(){
        super();
        this.state={
            tableData: [],
            tableLinks: {}
        }
    }

    componentWillMount(){
        this.fetchData();
        this.fetchLinks();
    }

    //fetch json data from remote server
    fetchData(){
        fetch('https://randomuser.me/api/?results=5')
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.results)
            .then((tableData) => this.setState({
                tableData
            }))
            .catch(error => console.log("parsing failed", error))
    }

    fetchLinks(){
        fetch('https://randomuser.me/api/?results=5')
            .then((response) => response.json())
            .then(parsedJSON => parsedJSON.results)
            .then((tableLinks) => this.setState({
                tableLinks
            }))
    }

    render(){
        if(this.state.tableData && this.state.tableData.length > 0){
            return (
                <Table
                    tableData={this.state.tableData}
                    tableLinks={this.state.tableLinks}
                />
            );
        }else {
            return "";
        }

    }
}

render(<App/>, window.document.getElementById("app"));