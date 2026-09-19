import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-thane
 * Keyword: bed repair thane, bed repair in thane
 */
const BedRepairThane: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'thane')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairThane;
