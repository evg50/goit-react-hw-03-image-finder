import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImageGalleryItem from './ImageGalleryItem'

export default class ImageGallery extends Component {
    state= {
        images:null,
        page:1,
        error:null,
        status:'idle'
    }
componentDidUpdate(prevProps, prevState,) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    // console.log('oldPage ',prevPage, 'newPage', nextPage);
    const prevSearch = prevProps.searchText
    // console.log('prevSearch',prevSearch);
    const nextSearch = this.props.searchText;
    // console.log ('nextSearch',nextSearch);
    // console.log("Update",this.state.page);
    if(this.state.images){console.log("finalyState",this.state.images)}
    
    if(prevSearch !== nextSearch|| prevPage < nextPage ) {
        // let pageNumber = 1
        // console.log(nextSearch.inputSearch);
        // console.log('prevProps',prevProps);
        // console.log('prevState',prevState);
        this.setState({status:'pending'});
        fetch (`https://pixabay.com/api/?key=23915322-b5091aa0ad0b72709b6c0de72&q=${nextSearch.inputSearch}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12
        `)
            .then (res=> {
                if (res.ok) {
                
                    return res.json();
                    
                }
                
            return Promise.reject(
                console.log('error'),
                new Error(`Нет картинок с таким запросом $(nextSearch)`),
                )
            })    
            .then (images => {console.log('images',images);
                if(images.total===0){
                    return this.setState({status:'rejected'})
                }
                return this.setState({images, status:'resolved'})}
                )
                
            .catch(error=> this.setState({error, status:'rejected'}))
            // .finally(()=>this.setState({loading:false}))
            
            console.log("state",this.state.images);
     }

}
    pageClickHeandler = () => {
       
       
       this.setState((prevState)=>{
    //    console.log(this.state.page);
       return ({page:prevState.page+1})
       
       })
        
    }

    render() {
        const {loading, images, error, status}= this.state;

        if (status=== 'idle') {
            return (<div>введите поиск</div>)
            }
        if (status=== 'pending') {
            return (<div>загружаем</div>)
            }
        if (status=== 'rejected') {
            return (<h1>Нет картинок с таким названием !</h1>)
        }
        if (status=== 'resolved') {
            return (
                <ul className="ImageGallery">
                    
                   
                    {images.hits.map(image =>
                    <li key = {image.id}>
                        <ImageGalleryItem 
                        imgUrl={image.previewURL} 
                        imgTitle={image.tags}/>
                    </li>  
                    ) 
                    }
                    <button type="button" onClick={this.pageClickHeandler}>Load more</button>
                    
                </ul>
                )
        }


        
    }
}



