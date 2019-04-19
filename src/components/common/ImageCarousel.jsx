import React from "react";
import Slider from "react-slick";
import { EditableImageUpload } from "react-easy-editables";
import { uploadImage } from "../../firebase/operations";

const PrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      onClick={onClick}
    >
      <i className="fas fa-angle-left"></i>
    </button>
  );
}

const NextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      onClick={onClick}
    >
      <i className="fas fa-angle-right"></i>
    </button>
  );
}



class ImageCarousel extends React.Component {
  render() {
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };

    const content = this.props.content;

    return (
      <div className="slider-active">
        <Slider {...settings}>
          <div className="pt-10 pb-10 pl-10 pr-10">
            <EditableImageUpload
              classes={"slider-height-sm"}
              uploadImage={ uploadImage }
              onSave={this.props.onSave("carousel-img-1")}
              content={content["carousel-img-1"]}
            />
          </div>

          <div className="pt-10 pb-10 pl-10 pr-10">
            <EditableImageUpload
              classes={"slider-height-sm"}
              uploadImage={ uploadImage }
              onSave={this.props.onSave("carousel-img-2")}
              content={content["carousel-img-2"]}
            />
          </div>

          <div className="pt-10 pb-10 pl-10 pr-10">
            <EditableImageUpload
              classes={"slider-height-sm"}
              uploadImage={ uploadImage }
              onSave={this.props.onSave("carousel-img-3")}
              content={content["carousel-img-3"]}
            />
          </div>
        </Slider>
      </div>
    );
  }
}

export default ImageCarousel

