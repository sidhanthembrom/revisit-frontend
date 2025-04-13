import "./Card.css";

const Card = (props) => {
  const { category } = props;
  
  return (
    <div className="card-container">
      <img
        className="card-image"
        src={category.image_url}
        alt={"category-thumbnail"}
      />
      <div className="text-container">
        <p className="title">{category.name}</p>
        <p className="count">{`${category.item_count} items`}</p>
      </div>
    </div>
  );
};

export default Card;
