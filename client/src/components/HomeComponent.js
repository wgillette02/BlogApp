import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, Jumbotron } from 'reactstrap';
import Items from '../shared/carouselItems';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
            animating: false
        };

        this.setActiveIndex = this.setActiveIndex.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.setAnimating = this.setAnimating.bind(this);
    }

    setActiveIndex(idx) {
        this.setState({
            activeIndex: idx
        })
    }

    next() {
        if (!this.state.animating){
            const nextIndex = this.state.activeIndex === Items.length-1 ? 0 : this.state.activeIndex + 1;
            this.setActiveIndex(nextIndex);
        }
    }

    previous() {
        if (!this.state.animating){
            const prevIndex = this.state.activeIndex === 0 ? Items.length-1 : this.state.activeIndex - 1;
            this.setActiveIndex(prevIndex);
        }
    }

    goToIndex(newIndex) {
        if (!this.state.animating){
            this.setActiveIndex(newIndex);
        }
    }
    
    setAnimating(bool){
        this.setState({
            animating: bool
        })
    }

    render() {
        const slides = Items.map((item) => {
            return (
                <CarouselItem
                onExiting={() => this.setAnimating(true)}
                onExited={() => this.setAnimating(false)}
                key={item.src}
                >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.altText} />
                </CarouselItem>
            );
        });
        
        return (
            <div>
                <Jumbotron>
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <Carousel activeIndex={this.state.activeIndex} next={this.next} previous={this.previous}>
                                <CarouselIndicators items={Items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                                {slides}
                                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                            </Carousel>
                        </div>
                    </div> 
                    
                </Jumbotron>
            </div>
        )
    }
}

export default Home;