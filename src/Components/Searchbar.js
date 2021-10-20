import React, { Component } from 'react'

 class Searchbar extends Component { 
    state = {
        inputSearch:""
    };
    changeSearch = (e) => {
        this.setState({[e.target.name]:e.target.value})

    }

    submitHeandler = (e) => {
        e.preventDefault();
        // console.log(this.props.onSubmit);
        if (!this.state.inputSearch.trim()){
            alert('No !')
            return;
        }
        this.props.onSubmit(this.state);
        this.setState({inputSearch:""})
        // this.resetSearch();
    }
    resetSearch = () => {
        this.seState({inputSearch:""})
    }
    render() {
      
    

        return (
            <header className="Searchbar">
                <form className="SearchForm">
                    <button 
                    type="submit"
                    className="SearchForm-button"
                    onClick={this.submitHeandler}
                    >
                        <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                        name = "inputSearch"
                        value={this.state.inputSearch}
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.changeSearch}
                        
                        />
                    
                </form>
            </header>

        )
    }
} 
export default  Searchbar;