import React, { Component } from 'react'
import Searchbar from "./Components/Searchbar"
import ImageGallery from './Components/ImageGallery'
import "./styles.css"

class App extends Component {
  state = {
    searchWord:'',
  }
  formSubmitHeandler = (searchWord) => {
    console.log(searchWord)
    this.setState({searchWord})
  }
  
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.formSubmitHeandler}/>
        <ImageGallery searchText={this.state.searchWord} />
      </div>
    )
  }
}
export default App;