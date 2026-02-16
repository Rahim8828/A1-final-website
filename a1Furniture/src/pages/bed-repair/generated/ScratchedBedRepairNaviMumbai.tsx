import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /scratched-bed-repair-navi-mumbai
 * Keyword: scratched bed repair navi mumbai
 */
const ScratchedBedRepairNaviMumbai: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'scratched')!;
  const location = bedRepairLocations.find((l) => l.id === 'navi-mumbai')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default ScratchedBedRepairNaviMumbai;
