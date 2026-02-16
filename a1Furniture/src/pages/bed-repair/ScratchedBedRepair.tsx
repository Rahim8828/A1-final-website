import React from 'react';
import BedRepairPageTemplate from '../../components/BedRepairPageTemplate';
import { bedRepairProblems } from '../../data/bedRepairConfig';

/**
 * Problem page: /scratched-bed-repair
 * Keyword: scratched bed repair mumbai
 */
const ScratchedBedRepair: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'scratched')!;
  return <BedRepairPageTemplate pageType="problem" problem={problem} />;
};

export default ScratchedBedRepair;
