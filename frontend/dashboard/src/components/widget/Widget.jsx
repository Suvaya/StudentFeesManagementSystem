import React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./widget.scss";

const Widget = ({ type }) => {
  return (
    <div>
      {type === 'fee' && (
        <div className="widget">
          <div className="left">
            <span className="title">Rs.</span>
            <span className="counter">90000</span>
            <span className="link">Fee:</span>
          </div>
          <div className="right">
            <MoreVertIcon className="icon"/>
          </div>
        </div>
      )}
      {type === 'markcompare' && (
        <div className="widget">
          <div className="left">
            <span className="title1">Highest Marks:</span>
            <span className="subject">Subject:</span>
          </div>
          <div className="right">
            <MoreVertIcon className="icon"/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Widget;
