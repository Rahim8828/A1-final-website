import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /scratched-bed-repair-dadar
 * Keyword: scratched bed repair dadar
 */
const ScratchedBedRepairDadar: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'scratched')!;
  const location = bedRepairLocations.find((l) => l.id === 'dadar')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default ScratchedBedRepairDadar;
