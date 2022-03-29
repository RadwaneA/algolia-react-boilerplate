// Component to render injected content from the Algolia dashboard, eg 'Free return Policy'
import { motion } from 'framer-motion';

// Import framer Motion config
import { framerMotionHits } from '../../config/config';

// Display an image, within a framer-motion wrapper
const GiftCard = ({ hit }) => {
  return (
    <motion.li
      variants={framerMotionHits}
      initial="hidden"
      animate="show"
      className="hit-list"
    >
      <div className="image-wrapper">
        <img src={hit.image.desktop_url} alt="" />
      </div>
    </motion.li>
  );
};

export default GiftCard;
