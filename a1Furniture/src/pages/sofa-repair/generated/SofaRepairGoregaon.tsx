import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-goregaon
 * Keyword: sofa repair goregaon, sofa repair in goregaon
 */
const SofaRepairGoregaon: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'goregaon')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairGoregaon;
