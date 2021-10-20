import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImageGalleryItem from './ImageGalleryItem'

export default class ImageGallery extends Component {
    state= {
        images:null,
        
        error:null,
        status:'idle'
    }
componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchText
    // console.log('prevSearch',prevSearch);
    const nextSearch = this.props.searchText;
    // console.log ('nextSearch',nextSearch);
    // console.log("state1",this.state.images);
    if(this.state.images){console.log("finalyState",this.state.images)}
    
    if(prevSearch !== nextSearch) {
        // console.log(nextSearch.inputSearch);
        // console.log('prevProps',prevProps);
        // console.log('prevState',prevState);
        this.setState({status:'pending'});
        fetch (`https://pixabay.com/api/?key=23915322-b5091aa0ad0b72709b6c0de72&q=${nextSearch.inputSearch}&image_type=photo`)
            .then (res=> {
                if (res.ok) {
                    console.log(res.ok);
                    return res.json();
                }
                
            return Promise.reject(
                console.log('error'),
                new Error(`Нет картинок с таким запросом $(nextSearch)`),
                )
            })    
            .then (images => this.setState({images, status:'resolved'}))
            .catch(error=> this.setState({error, status:'rejected'}))
            // .finally(()=>this.setState({loading:false}))
            
            console.log("state",this.state.images);
     }
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
            return (<div>error.message</div>)
        }
        if (status=== 'resolved') {
            return (
                <ul className="ImageGallery">
                    
                    {loading&&<div>загружаем</div>}
                    {images&&<div>{images.hits.map(image =>
                    <li key = {image.id}>
                        <ImageGalleryItem 
                        imgUrl={image.previewURL} 
                        imgTitle={image.tags}/>
                    </li>  
                    ) 
                    }
                    </div>
                    }
                </ul>
                )
        }


        
    }
}



