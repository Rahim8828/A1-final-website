import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /faded-bed-repair-malad
 * Keyword: faded bed repair malad
 */
const FadedBedRepairMalad: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'faded')!;
  const location = bedRepairLocations.find((l) => l.id === 'malad')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default FadedBedRepairMalad;
