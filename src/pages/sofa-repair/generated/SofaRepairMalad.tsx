import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-malad
 * Keyword: sofa repair malad, sofa repair in malad
 */
const SofaRepairMalad: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'malad')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairMalad;
