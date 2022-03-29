// Render the navigation menu in the header

// React Router
import { useNavigate } from 'react-router-dom';
// Recoil Header State
import { useRecoilState } from 'recoil';

// Import Config for the header
import { hierarchicalFacet } from '../../../config/config';
import { linksHeader } from '../../../config/header';
import SelectPersona from '../personnaSelect/SelectPersona';

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  // navigate is used by React Router
  const navigate = useNavigate();

  // Import the navigation links, as defined in the config
  const [links] = useRecoilState(linksHeader);
  return (
    <ul
      className={`${
        isMenuOpen
          ? 'container-mobile__navList-items'
          : 'container__header-bottom__links'
      } `}
    >
      {links.map((link) => {
        return (
          <li
            key={link.url}
            onClick={() => {
              // Open the sub-menu if the link is hierarchical, otherwise run a search
              if (link.link !== 'All') {
                navigate(`/search`, {
                  state: `${hierarchicalFacet.hierarchicalLvl0}:'${link.filter}'`,
                });
              } else {
                navigate('/search');
              }
              setIsMenuOpen(false);
            }}
          >
            <p>{link.link}</p>
          </li>
        );
      })}
      {/* Display the persona selection component */}
      <li>
        <SelectPersona />
      </li>
    </ul>
  );
};

export default Navigation;
