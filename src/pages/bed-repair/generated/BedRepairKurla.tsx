import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-kurla
 * Keyword: bed repair kurla, bed repair in kurla
 */
const BedRepairKurla: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'kurla')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairKurla;
