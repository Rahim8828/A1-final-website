import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-goregaon
 * Keyword: bed repair goregaon, bed repair in goregaon
 */
const BedRepairGoregaon: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'goregaon')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairGoregaon;
