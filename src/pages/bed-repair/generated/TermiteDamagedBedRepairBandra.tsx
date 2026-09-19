import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /termite-damaged-bed-repair-bandra
 * Keyword: termite damaged bed repair bandra
 */
const TermiteDamagedBedRepairBandra: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'termite')!;
  const location = bedRepairLocations.find((l) => l.id === 'bandra')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default TermiteDamagedBedRepairBandra;
