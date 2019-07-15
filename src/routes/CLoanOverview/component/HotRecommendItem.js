import React from 'react';
import { Link } from 'react-router-dom';
import prodWaitingImg from '../image/prod-waiting.png';

const HotRecommendItem = (props) => {
  const { dataItem } = props;

  /**
   * 热门推荐 source 3
   */
  return (
    <div className="carousel_inner_img_wrap">
      {
        dataItem ? (
          <Link
            to={`/customer-product-detail/3/${dataItem.id}`}
            className="carousel_inner_link"
          >
            <img src={dataItem.smallImage} alt="热门推荐" className="carousel_inner_img" />
          </Link>
        ) : (
          <img src={prodWaitingImg} alt="敬请期待" className="carousel_inner_img" />
        )
      }
    </div>
  );
};

export default HotRecommendItem;
