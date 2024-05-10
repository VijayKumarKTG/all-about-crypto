/* eslint-disable react/prop-types */
import classes from './collectionCard.module.scss';

const CollectionCard = ({
  rank,
  image,
  name,
  category,
  quantity,
  chain,
  url,
}) => {
  return (
    <li className={classes.collectionItem}>
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
          <span>Category : </span>
          <strong>{category || '--'}</strong>
        </div>
        <div className={classes.metadata}>
          <span>Quantity : </span>
          <strong>{quantity || '--'}</strong>
        </div>
        <div className={classes.metadata}>
          <span>Chain : </span>
          <strong>{chain}</strong>
        </div>
      </div>
    </li>
  );
};

export default CollectionCard;
