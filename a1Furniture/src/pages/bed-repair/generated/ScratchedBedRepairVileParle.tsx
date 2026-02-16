import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /scratched-bed-repair-vile-parle
 * Keyword: scratched bed repair vile parle
 */
const ScratchedBedRepairVileParle: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'scratched')!;
  const location = bedRepairLocations.find((l) => l.id === 'vile-parle')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default ScratchedBedRepairVileParle;
