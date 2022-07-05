import React from 'react';
import useScreenSize from '@/hooks/useScreenSize';
import CustomSkeleton from '@/components/skeletons/CustomSkeleton';

const SkeletonLoader = ({type}) => {
  const { tablet, mobile } = useScreenSize();

  // Change this number to render more placeholders on the SRP loader
  const resultsNumber = 20;

  switch (type) {
    case "hit":
      return (
        <div
          className={`${tablet || mobile ? 'skeleton-mobile' : 'skeleton'}`} // initial state
        >
          <div className="skeleton__hits">
            <div
              className={`${tablet || mobile
                ? 'skeleton-mobile__hitsList'
                : 'skeleton__hitsList'
                }`}
            >
              {[...Array(resultsNumber)].map((e, i) => <div key={i + "hit"}><CustomSkeleton {...{type}} /></div>)}
            </div>
          </div>
        </div>
      );
    case "facet":
      return (
        <div>
          {[...Array(4)].map((e, i) => <div key={i + "facet"}><CustomSkeleton {...{type}} /></div>)}
        </div>
      )
  }
};

export default SkeletonLoader;
