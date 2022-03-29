// Render the Header component in Main.jsx, for large screen sizes

// React Router
import { Link } from 'react-router-dom';
// Recoil Header State
import { useRecoilState, useSetRecoilState } from 'recoil';

// Import Config for the header
import { configAtom } from '../../../config/config';

// eslint-disable-next-line import/order
import { queryAtom } from '../../../config/searchbox';

//Import config for federatedSearch
import { isFederatedAtom, isVoiceSearch } from '../../../config/config';

// Import SearchBox
// eslint-disable-next-line import/order
import CustomSearchBoxSimple from '../../searchbox/SearchBox';

// Import VoiceSearchComponent
import CustomVoiceSearchComponent from '../../voicesearch/VoiceSearch';
import SelectPersona from '../personnaSelect/SelectPersona';
import Navigation from './Navigation';

const HeaderLaptop = () => {
  const setQueryState = useSetRecoilState(queryAtom);
  const federated = useSetRecoilState(isFederatedAtom);
  // Define value to display voiceSearch
  const displayVoiceSearch = useSetRecoilState(isVoiceSearch);

  return (
    <div className="container">
      <div className="container__header-top">
        <div className="container__header-top__logo">
          <Link
            to="/"
            onClick={() => {
              setQueryState('');
              federated(false);
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Algolia-logo.svg/1200px-Algolia-logo.svg.png"
              alt=""
            />
          </Link>
        </div>
        {/* For a search box Simple center */}
        <div className="searchbox-container">
          <CustomSearchBoxSimple />
          {displayVoiceSearch && <CustomVoiceSearchComponent />}
        </div>
        <div className="container__header-top__title">
          <h1>Demo BoilerPlate</h1>
        </div>
      </div>
      <div className="container__header-bottom">
        <Navigation />
        {/* <SelectPersona /> */}
      </div>
    </div>
  );
};

export default HeaderLaptop;
