import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /termite-damaged-bed-repair-goregaon
 * Keyword: termite damaged bed repair goregaon
 */
const TermiteDamagedBedRepairGoregaon: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'termite')!;
  const location = bedRepairLocations.find((l) => l.id === 'goregaon')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default TermiteDamagedBedRepairGoregaon;
