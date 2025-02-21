import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

// ChannelCard component
const ChannelCard = ({ channel, onSelect }) => {
  return (
    <Card onClick={() => onSelect(channel)}>
      <Card.Img
        variant="top"
        src={channel.imageUrl}
        alt={channel.displayName}
      />
      <Card.Body>
        <Card.Title>{channel.displayName}</Card.Title>
        <Card.Text>
          <strong>Category: </strong>
          {channel.category.join(", ")}
        </Card.Text>
        <Button variant="primary">Watch Now</Button>
      </Card.Body>
    </Card>
  );
};

// PropTypes validation
ChannelCard.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired, // The onSelect function to handle channel selection
};

export default ChannelCard;
