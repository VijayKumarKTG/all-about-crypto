/* eslint-disable react/prop-types */

import classes from './nftCard.module.scss';

const NftCard = ({
  rank,
  image,
  name,
  rarity_rank,
  rarity_score,
  quantity,
  url,
  collection,
  collection_url,
}) => {
  return (
    <li className={classes.nftItem}>
      <div>
        <div className={classes.count}>{rank}</div>
        <img src={image} alt={name} />
      </div>
      <div>
        <h4>
          <a href={url} target='_blank' rel='noreferrer'>
            {name}
          </a>
        </h4>
        <div className={classes.metadata}>
          <span>Rarity Rank in Collection : </span>
          <strong>#{rarity_rank}</strong>
        </div>
        <div className={classes.metadata}>
          <span>Rarity Score in Collection : </span>
          <strong>{rarity_score}</strong>
        </div>
        <div className={classes.metadata}>
          <span>Token Count : </span>
          <strong>{quantity}</strong>
        </div>
        <div className={classes.metadata}>
          <span>Collection : </span>
          <strong>
            <a href={collection_url} target='_blank' rel='norefferer'>
              {collection}
            </a>
          </strong>
        </div>
      </div>
    </li>
  );
};

export default NftCard;
