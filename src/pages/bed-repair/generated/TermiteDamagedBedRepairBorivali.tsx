import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /termite-damaged-bed-repair-borivali
 * Keyword: termite damaged bed repair borivali
 */
const TermiteDamagedBedRepairBorivali: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'termite')!;
  const location = bedRepairLocations.find((l) => l.id === 'borivali')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default TermiteDamagedBedRepairBorivali;
