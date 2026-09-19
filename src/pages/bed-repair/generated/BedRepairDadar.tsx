import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-dadar
 * Keyword: bed repair dadar, bed repair in dadar
 */
const BedRepairDadar: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'dadar')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairDadar;
