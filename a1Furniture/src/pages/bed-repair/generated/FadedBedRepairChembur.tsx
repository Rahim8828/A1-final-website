import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /faded-bed-repair-chembur
 * Keyword: faded bed repair chembur
 */
const FadedBedRepairChembur: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'faded')!;
  const location = bedRepairLocations.find((l) => l.id === 'chembur')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default FadedBedRepairChembur;
