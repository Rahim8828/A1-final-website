import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-juhu
 * Keyword: sofa repair juhu, sofa repair in juhu
 */
const SofaRepairJuhu: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'juhu')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairJuhu;
