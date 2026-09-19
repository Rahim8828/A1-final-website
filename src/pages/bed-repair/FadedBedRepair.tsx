import React from 'react';
import BedRepairPageTemplate from '../../components/BedRepairPageTemplate';
import { bedRepairProblems } from '../../data/bedRepairConfig';

/**
 * Problem page: /faded-bed-repair
 * Keyword: faded bed repair mumbai
 */
const FadedBedRepair: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'faded')!;
  return <BedRepairPageTemplate pageType="problem" problem={problem} />;
};

export default FadedBedRepair;
