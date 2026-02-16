import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-wadala
 * Keyword: sofa repair wadala, sofa repair in wadala
 */
const SofaRepairWadala: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'wadala')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairWadala;
