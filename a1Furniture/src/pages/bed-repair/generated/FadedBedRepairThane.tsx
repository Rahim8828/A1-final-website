import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /faded-bed-repair-thane
 * Keyword: faded bed repair thane
 */
const FadedBedRepairThane: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'faded')!;
  const location = bedRepairLocations.find((l) => l.id === 'thane')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default FadedBedRepairThane;
