import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-jogeshwari
 * Keyword: bed repair jogeshwari, bed repair in jogeshwari
 */
const BedRepairJogeshwari: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'jogeshwari')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairJogeshwari;
