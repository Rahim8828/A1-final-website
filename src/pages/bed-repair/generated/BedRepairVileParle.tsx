import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-vile-parle
 * Keyword: bed repair vile parle, bed repair in vile parle
 */
const BedRepairVileParle: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'vile-parle')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairVileParle;
