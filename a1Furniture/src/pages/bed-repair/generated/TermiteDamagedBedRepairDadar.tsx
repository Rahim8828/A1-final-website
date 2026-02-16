import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /termite-damaged-bed-repair-dadar
 * Keyword: termite damaged bed repair dadar
 */
const TermiteDamagedBedRepairDadar: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'termite')!;
  const location = bedRepairLocations.find((l) => l.id === 'dadar')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default TermiteDamagedBedRepairDadar;
