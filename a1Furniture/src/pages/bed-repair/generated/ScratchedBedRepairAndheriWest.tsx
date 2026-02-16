import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /scratched-bed-repair-andheri-west
 * Keyword: scratched bed repair andheri west
 */
const ScratchedBedRepairAndheriWest: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'scratched')!;
  const location = bedRepairLocations.find((l) => l.id === 'andheri-west')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default ScratchedBedRepairAndheriWest;
