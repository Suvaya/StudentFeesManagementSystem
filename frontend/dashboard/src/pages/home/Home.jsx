import React from "react";
import "./home.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <div className="widgets">
          <Widget type="fee"/>
          <Widget type="markcompare"/>
        </div>
        <div className="listContainer">
          <h1><div className="listTitle" align="center">Mark Table</div></h1>
          <Table />
        </div>
      </div>
    </div>
  )
}

export default Home