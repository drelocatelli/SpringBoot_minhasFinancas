import React from "react";

import Navbar from "../components/navbar";
import Routes from './routes'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/zephyr/bootstrap.min.css'
import './style.css';
import 'toastr/build/toastr.css'

class App extends React.Component {
  render(){
    return(
    <div>
      <Navbar />
      <Routes />
    </div>
    )
  }
}

export default App;
