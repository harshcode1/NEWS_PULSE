import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageURL, url, author, time,source} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <img src={imageURL} className="card-img-top" alt="..." />
          <div className="card-body">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1",left:'90%'}}>
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">Written by {!author ? "UNKNOWN" : author} on {new Date(time).toGMTString()}</small></p>
            <a href={url || "https://static.toiimg.com/thumb/msid-105007577,width-1070,height-580,imgsize-47334,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} rel="noopener noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem