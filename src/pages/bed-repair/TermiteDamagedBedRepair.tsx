import React from 'react';
import BedRepairPageTemplate from '../../components/BedRepairPageTemplate';
import { bedRepairProblems } from '../../data/bedRepairConfig';

/**
 * Problem page: /termite-damaged-bed-repair
 * Keyword: termite damaged bed repair mumbai
 */
const TermiteDamagedBedRepair: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'termite')!;
  return <BedRepairPageTemplate pageType="problem" problem={problem} />;
};

export default TermiteDamagedBedRepair;
