import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-lokhandwala
 * Keyword: sofa repair lokhandwala, sofa repair in lokhandwala
 */
const SofaRepairLokhandwala: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'lokhandwala')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairLokhandwala;
