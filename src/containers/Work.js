import React, {Component} from 'react';
import WorkItem from "../components/WorkItem";

class Work extends Component {

    render() {
        return (
            <div>
                <WorkItem workItem={{text: "aaa",time_view:"20200601"}}/>
                <WorkItem workItem={{text: "bbb",time_view:"20200601"}}/>
                <WorkItem workItem={{text: "ccc",time_view:"20200601"}}/>
            </div>
        )
    }
}

export default Work