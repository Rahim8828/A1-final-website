import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-malad
 * Keyword: bed repair malad, bed repair in malad
 */
const BedRepairMalad: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'malad')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairMalad;
