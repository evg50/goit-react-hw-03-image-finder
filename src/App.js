
import './App.css';

function App() {
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {  toast } from 'react-toastify';

class Searchbar extends Component {
    static propTypes = {

    }
    state = {
        search:"",
        }
    inputHandler = (e) => {
        // console.log(e.currentTarget.value);
        const {value,name} =e.currentTarget;
        this.setState({[name]:value});
    }

    submitForm = (e) => {
        e.preventDefault();
        if (this.state.search.trim()==="") {
            alert('Ввеите имя покемонаю');
            return;
        }
        this.props.onSubmit(this.state.search);
        this.reset();
  };

  reset = () => {
    this.setState({ search: "",  });
  };
    

    render() {
        return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.submitForm}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                    
                </button>

                <input
                    name="search"
                    className="SearchForm-input"
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                    value={this.state.search}
                    onChange = {this.inputHandler}
                    />
            </form>
        </header>
        )
    }
}

export default Searchbar

import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class ImageGallery extends Component {
    state= {
        images:null
    }
componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchText
    console.log('prevSearch',prevSearch);
    const nextSearch = this.props.searchText;
    console.log ('nextSearch',nextSearch);
    if(prevSearch !== nextSearch) {
        console.log("chenge props!");
        // console.log('prevProps',prevProps);
        // console.log('prevState',prevState);
        fetch ('https://pixabay.com/api/?key=23915322-b5091aa0ad0b72709b6c0de72&q={word}&image_type=photo')
            .then (res=> res.json())
            .then (images => this.setState({images}));
            console.log("state",this.state.images);
     }
}
    render() {
        return (
        <ul className="ImageGallery">
            
            {this.state.images.map(image =>
                <li key = "image.id"
                 )}
            
            {/* <!-- Набор <li> с изображениями --></li> */}
        </ul>
        )
    }
}