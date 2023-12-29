import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  // articles = [
  //   {
  //     "source": {
  //       "id": "bbc-sport",
  //       "name": "BBC Sport"
  //     },
  //     "author": null,
  //     "title": "'A truly dreadful dismissal' - Shami bowls Stokes for a duck",
  //     "description": "Watch as India's Mohamed Shami bowls Ben Stokes for a duck as England's batting order continues to fall cheaply in their match at the Cricket World Cup.",
  //     "url": "http://www.bbc.co.uk/sport/av/cricket/67256372",
  //     "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/151EA/production/_131560568_p0gphxh7.jpg",
  //     "publishedAt": "2023-10-29T14:22:23.5460169Z",
  //     "content": "Watch as India's Mohamed Shami bowls Ben Stokes for a duck as England's batting order continues to fall cheaply in their match at the Cricket World Cup. \r\nFollow India vs England LIVE\r\nAvailable to U… [+12 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "bbc-sport",
  //       "name": "BBC Sport"
  //     },
  //     "author": null,
  //     "title": "World Cup: England win toss and bowl first against unbeaten hosts India",
  //     "description": "Follow live text, in-play video clips and radio commentary as India play England in the Men's Cricket World Cup 2023.",
  //     "url": "http://www.bbc.co.uk/sport/live/cricket/66858750",
  //     "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.23.3/images/bbc-sport-logo.png",
  //     "publishedAt": "2023-10-29T08:37:16.4160546Z",
  //     "content": "England: Jonny Bairstow, Dawid Malan, Joe Root, Ben Stokes, Jos Buttler (c/wk), Liam Livingstone, Moeen Ali, Chris Woakes, David Willey, Adil Rashid, Mark Wood. \r\nIndia: Rohit Sharma (c), Shubman Gil… [+141 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     "publishedAt": "2020-04-27T11:41:47Z",
  //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   }
  // ]

  capitilize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
  }

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  }

  constructor(props) {
    super(props);
    console.log("Hello I am an Constructor from NEWS ITEM");
    this.state = {
      loading: true,
      articles: [],
      page: 1,
      totalResults: 0
    }
    document.title = `NewsShow - ${this.props.category}`
  }

  async componentDidMount() {
    this.updateNews()
  }

  async updateNews() {
    try {
      this.props.setProgress(10)
      // here &page=1 is displaying only a number of articles when page =2 then another items will display
      let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ApiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true
      })
      let response = await fetch(URL);
      this.props.setProgress(40)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();
      this.props.setProgress(70)
      console.log(data);
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false
      });
      this.props.setProgress(100)
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  prevClick = async () => {
    // try {
    //   // here &page=1 is displaying only a number of articles when page =2 then another items will display
    //   let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12a1f048cddf4956b90c5446edc04519&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({
    //     loading: true
    //   })
    //   let response = await fetch(URL);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   let data = await response.json();
    //   console.log(data);
    //   this.setState({
    //     page: this.state.page - 1,
    //     articles: data.articles,
    //     loading: false
    //   });
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }

    this.setState({
      page: this.state.page - 1
    })
    this.updateNews()
  }

   fetchMoreData = async() => {
    this.setState({ page: this.state.page + 1 })
    try {
      // here &page=1 is displaying only a number of articles when page =2 then another items will display
      let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12a1f048cddf4956b90c5446edc04519&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      // this.setState({
      //   loading: true
      // })
      let response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      let data = await response.json();
      console.log(data);
      this.setState({
        articles: this.state.articles.concat(data.articles),
        totalResults: data.totalResults,
        // loading: false
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  nextClick = async () => {
    // console.log("Next Click");
    // if (!Math.ceil(this.state.page + 1 > this.state.totalResults / this.props.pageSize)) {
    //   try {
    //     // here &page=1 is displaying only a number of articles when page =2 then another items will display
    //     let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12a1f048cddf4956b90c5446edc04519&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({
    //       loading: true
    //     })
    //     let response = await fetch(URL);
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     let data = await response.json();

    //     this.setState({
    //       page: this.state.page + 1,
    //       articles: data.articles,
    //       loading: false
    //     });
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // }
    this.setState({
      page: this.state.page + 1
    })
    this.updateNews()
  }

  render() {
    // console.log("renfder");
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsShow - Top {this.props.category} Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          {this.state.loading && <Spinner />}
          {/* {this.state.articles.map((element)=>{console.log(element)})} ==> this will display the items in the console */}
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => {
                return <div key={index} className="col-md-4">
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageURL={!element.urlToImage ? "https://static.toiimg.com/thumb/msid-105007577,width-1070,height-580,imgsize-47334,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" : element.urlToImage} url={element.url} author={element.author} time={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.prevClick}>&larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > this.state.totalResults / this.props.pageSize} className="btn btn-dark" onClick={this.nextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}

export default News