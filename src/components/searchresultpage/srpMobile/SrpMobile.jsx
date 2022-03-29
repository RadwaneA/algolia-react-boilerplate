// This is the Search Results Page that you'll see on a phone screen

import { useState } from 'react';
// eslint-disable-next-line import/order
import { Configure, Index } from 'react-instantsearch-dom';

import { useLocation } from 'react-router-dom';

// import framer motion
import { motion } from 'framer-motion';
import { framerMotionPage, framerMotionFacet } from '../../../config/config';

// Recoil state to directly access results
import { useRecoilState, useRecoilValue } from 'recoil';

// Import Persona State from recoil
import { personaSelectedAtom } from '../../../config/header';

import { configAtom, isStats, isInjectedHits } from '../../../config/config';
import { queryAtom } from '../../../config/searchbox';

// Import Components
import CustomClearRefinements from '../../../components/facets/ClearRefinement';
import CustomCurrentRefinements from '../../../components/facets/CurrentRefinement';
import CustomHitsComponent from '../../../components/hits/CustomHits';
import GiftCard from '../../../components/hits/GiftCard';
import { Hit } from '../../../components/hits/Hits';
import InfluencerCard from '../../../components/hits/InfluencerCard';
import NikeCard from '../../../components/hits/SalesCard';
import CustomSortBy from '../../../components/searchresultpage/SortBy';
import { CustomStats } from '../../../components/searchresultpage/Stats';
import { InjectedHits } from '../../../components/searchresultpage/injected-hits';
import FacetsMobile from '../../facets/facetsMobile/FacetsMobile';
import { ChevronRight, ChevronLeft } from '../../../assets/svg/SvgIndex';

import { indexName, indexInfluencer } from '../../../config/appConfig';

// Import Config File
import { customDataByType } from '../../../utils';

const SrpMobile = () => {
  // Recoil & React states
  const [config] = useRecoilState(configAtom);
  const [injected, setInjected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const queryState = useRecoilValue(queryAtom);

  // Define Stat Const
  const stats = useRecoilValue(isStats);
  const hitsPerPageNotInjected = config.hitsPerPage.numberNotInjected;
  const hitsPerPageInjected = config.hitsPerPage.numberInjected;
  const injectedValue = useRecoilValue(isInjectedHits);

  // Define Price Sort By
  const priceSortBy = config.sortBy.value;
  const labelItems = config.sortBy.labelIndex;

  // Get states of React Router
  const { state } = useLocation();
  const personaSelect = useRecoilValue(personaSelectedAtom);

  // Persona
  const userToken = personaSelect;
  return (
    <div className="srp-container-mobile">
      <div
        className={`${
          isMenuOpen ? 'facets-slider-active' : 'facets-slider-inactive'
        } facets-slider`}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {isMenuOpen ? <ChevronRight /> : <ChevronLeft />}
        <p>Filters</p>
      </div>
      <FacetsMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <motion.div
        className="srp-container__hits"
        variants={framerMotionPage}
        initial={framerMotionPage.initial}
        animate={framerMotionPage.animate}
        exit={framerMotionPage.exit}
        transition={framerMotionPage.transition}
      >
        <div className="srp-container__stats-sort">
          {stats && <CustomStats />}
          {priceSortBy && (
            <CustomSortBy
              items={labelItems}
              defaultRefinement={indexName.index}
            />
          )}
        </div>

        <div className="refinement-container">
          <CustomCurrentRefinements />
          <CustomClearRefinements />
        </div>
        <Configure
          hitsPerPage={injected ? hitsPerPageInjected : hitsPerPageNotInjected}
          analytics={false}
          userToken={userToken}
          enablePersonalization={true}
          filters={state ? state : ''}
          query={queryState && queryState}
        />
        <Index indexName={indexInfluencer.index}>
          <Configure hitsPerPage={1} page={0} />
        </Index>
        {injectedValue ? (
          <InjectedHits
            hitComponent={Hit}
            slots={({ resultsByIndex }) => {
              const indexValue = indexName.index;
              const indexInfluencerValue = indexInfluencer.index;
              const { noCta, nikeCard } = customDataByType(
                resultsByIndex?.[indexValue]?.userData
              );
              // eslint-disable-next-line no-lone-blocks
              {
                // eslint-disable-next-line no-unused-expressions
                nikeCard && setInjected(true);
              }
              return [
                {
                  getHits: () => [noCta],
                  injectAt: noCta ? noCta.position : null,
                  slotComponent: GiftCard,
                },
                {
                  getHits: () => [nikeCard],
                  injectAt: nikeCard ? nikeCard.position : null,
                  slotComponent: NikeCard,
                },
                {
                  injectAt: ({ position }) => position === 2,
                  // eslint-disable-next-line no-shadow
                  getHits: ({ resultsByIndex }) => {
                    setInjected(true);
                    return resultsByIndex[indexInfluencerValue]
                      ? resultsByIndex[indexInfluencerValue].hits || []
                      : [];
                  },
                  slotComponent: InfluencerCard,
                },
              ];
            }}
          />
        ) : (
          <CustomHitsComponent />
        )}
      </motion.div>
    </div>
  );
};

export default SrpMobile;
