/**
 * Sofa Repair Routes — all 160 sofa repair SEO pages
 * 
 * This file provides a single component that renders all sofa repair routes.
 * Import and include <SofaRepairRoutes /> inside your <Routes> in App.tsx.
 * 
 * Structure:
 * - 1 master page: /sofa-repair-mumbai
 * - 4 problem pages: /scratched-sofa-repair, /faded-sofa-repair, etc.
 * - 31 location pages: /sofa-repair-{location}
 * - 124 location+problem pages: /{problem}-{location}
 */

import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

// ── Hand-crafted pages ──
const SofaRepairMumbai = lazy(() => import('../pages/sofa-repair/SofaRepairMumbai'));
const ScratchedSofaRepair = lazy(() => import('../pages/sofa-repair/ScratchedSofaRepair'));
const FadedSofaRepair = lazy(() => import('../pages/sofa-repair/FadedSofaRepair'));
const WaterDamagedSofaRepair = lazy(() => import('../pages/sofa-repair/WaterDamagedSofaRepair'));
const TermiteDamagedSofaRepair = lazy(() => import('../pages/sofa-repair/TermiteDamagedSofaRepair'));

// ── Generated Location Pages ──
const SofaRepairAndheriWest = lazy(() => import('../pages/sofa-repair/generated/SofaRepairAndheriWest'));
const SofaRepairAndheriEast = lazy(() => import('../pages/sofa-repair/generated/SofaRepairAndheriEast'));
const SofaRepairJogeshwari = lazy(() => import('../pages/sofa-repair/generated/SofaRepairJogeshwari'));
const SofaRepairGoregaon = lazy(() => import('../pages/sofa-repair/generated/SofaRepairGoregaon'));
const SofaRepairMalad = lazy(() => import('../pages/sofa-repair/generated/SofaRepairMalad'));
const SofaRepairKandivali = lazy(() => import('../pages/sofa-repair/generated/SofaRepairKandivali'));
const SofaRepairBorivali = lazy(() => import('../pages/sofa-repair/generated/SofaRepairBorivali'));
const SofaRepairDahisar = lazy(() => import('../pages/sofa-repair/generated/SofaRepairDahisar'));
const SofaRepairBandra = lazy(() => import('../pages/sofa-repair/generated/SofaRepairBandra'));
const SofaRepairKhar = lazy(() => import('../pages/sofa-repair/generated/SofaRepairKhar'));
const SofaRepairSantacruz = lazy(() => import('../pages/sofa-repair/generated/SofaRepairSantacruz'));
const SofaRepairVileParle = lazy(() => import('../pages/sofa-repair/generated/SofaRepairVileParle'));
const SofaRepairJuhu = lazy(() => import('../pages/sofa-repair/generated/SofaRepairJuhu'));
const SofaRepairVersova = lazy(() => import('../pages/sofa-repair/generated/SofaRepairVersova'));
const SofaRepairLokhandwala = lazy(() => import('../pages/sofa-repair/generated/SofaRepairLokhandwala'));
const SofaRepairOshiwara = lazy(() => import('../pages/sofa-repair/generated/SofaRepairOshiwara'));
const SofaRepairDadar = lazy(() => import('../pages/sofa-repair/generated/SofaRepairDadar'));
const SofaRepairSion = lazy(() => import('../pages/sofa-repair/generated/SofaRepairSion'));
const SofaRepairMatunga = lazy(() => import('../pages/sofa-repair/generated/SofaRepairMatunga'));
const SofaRepairKurla = lazy(() => import('../pages/sofa-repair/generated/SofaRepairKurla'));
const SofaRepairGhatkopar = lazy(() => import('../pages/sofa-repair/generated/SofaRepairGhatkopar'));
const SofaRepairVikhroli = lazy(() => import('../pages/sofa-repair/generated/SofaRepairVikhroli'));
const SofaRepairBhandup = lazy(() => import('../pages/sofa-repair/generated/SofaRepairBhandup'));
const SofaRepairMulund = lazy(() => import('../pages/sofa-repair/generated/SofaRepairMulund'));
const SofaRepairThane = lazy(() => import('../pages/sofa-repair/generated/SofaRepairThane'));
const SofaRepairWadala = lazy(() => import('../pages/sofa-repair/generated/SofaRepairWadala'));
const SofaRepairChembur = lazy(() => import('../pages/sofa-repair/generated/SofaRepairChembur'));
const SofaRepairNaviMumbai = lazy(() => import('../pages/sofa-repair/generated/SofaRepairNaviMumbai'));
const SofaRepairVashi = lazy(() => import('../pages/sofa-repair/generated/SofaRepairVashi'));
const SofaRepairPowai = lazy(() => import('../pages/sofa-repair/generated/SofaRepairPowai'));
const SofaRepairMiraRoad = lazy(() => import('../pages/sofa-repair/generated/SofaRepairMiraRoad'));

// ── Generated Location × Problem: Scratched ──
const ScratchedSofaRepairAndheriWest = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairAndheriWest'));
const ScratchedSofaRepairAndheriEast = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairAndheriEast'));
const ScratchedSofaRepairJogeshwari = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairJogeshwari'));
const ScratchedSofaRepairGoregaon = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairGoregaon'));
const ScratchedSofaRepairMalad = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairMalad'));
const ScratchedSofaRepairKandivali = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairKandivali'));
const ScratchedSofaRepairBorivali = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairBorivali'));
const ScratchedSofaRepairDahisar = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairDahisar'));
const ScratchedSofaRepairBandra = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairBandra'));
const ScratchedSofaRepairKhar = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairKhar'));
const ScratchedSofaRepairSantacruz = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairSantacruz'));
const ScratchedSofaRepairVileParle = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairVileParle'));
const ScratchedSofaRepairJuhu = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairJuhu'));
const ScratchedSofaRepairVersova = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairVersova'));
const ScratchedSofaRepairLokhandwala = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairLokhandwala'));
const ScratchedSofaRepairOshiwara = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairOshiwara'));
const ScratchedSofaRepairDadar = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairDadar'));
const ScratchedSofaRepairSion = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairSion'));
const ScratchedSofaRepairMatunga = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairMatunga'));
const ScratchedSofaRepairKurla = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairKurla'));
const ScratchedSofaRepairGhatkopar = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairGhatkopar'));
const ScratchedSofaRepairVikhroli = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairVikhroli'));
const ScratchedSofaRepairBhandup = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairBhandup'));
const ScratchedSofaRepairMulund = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairMulund'));
const ScratchedSofaRepairThane = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairThane'));
const ScratchedSofaRepairWadala = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairWadala'));
const ScratchedSofaRepairChembur = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairChembur'));
const ScratchedSofaRepairNaviMumbai = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairNaviMumbai'));
const ScratchedSofaRepairVashi = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairVashi'));
const ScratchedSofaRepairPowai = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairPowai'));
const ScratchedSofaRepairMiraRoad = lazy(() => import('../pages/sofa-repair/generated/ScratchedSofaRepairMiraRoad'));

// ── Generated Location × Problem: Faded ──
const FadedSofaRepairAndheriWest = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairAndheriWest'));
const FadedSofaRepairAndheriEast = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairAndheriEast'));
const FadedSofaRepairJogeshwari = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairJogeshwari'));
const FadedSofaRepairGoregaon = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairGoregaon'));
const FadedSofaRepairMalad = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairMalad'));
const FadedSofaRepairKandivali = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairKandivali'));
const FadedSofaRepairBorivali = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairBorivali'));
const FadedSofaRepairDahisar = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairDahisar'));
const FadedSofaRepairBandra = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairBandra'));
const FadedSofaRepairKhar = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairKhar'));
const FadedSofaRepairSantacruz = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairSantacruz'));
const FadedSofaRepairVileParle = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairVileParle'));
const FadedSofaRepairJuhu = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairJuhu'));
const FadedSofaRepairVersova = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairVersova'));
const FadedSofaRepairLokhandwala = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairLokhandwala'));
const FadedSofaRepairOshiwara = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairOshiwara'));
const FadedSofaRepairDadar = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairDadar'));
const FadedSofaRepairSion = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairSion'));
const FadedSofaRepairMatunga = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairMatunga'));
const FadedSofaRepairKurla = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairKurla'));
const FadedSofaRepairGhatkopar = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairGhatkopar'));
const FadedSofaRepairVikhroli = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairVikhroli'));
const FadedSofaRepairBhandup = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairBhandup'));
const FadedSofaRepairMulund = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairMulund'));
const FadedSofaRepairThane = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairThane'));
const FadedSofaRepairWadala = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairWadala'));
const FadedSofaRepairChembur = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairChembur'));
const FadedSofaRepairNaviMumbai = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairNaviMumbai'));
const FadedSofaRepairVashi = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairVashi'));
const FadedSofaRepairPowai = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairPowai'));
const FadedSofaRepairMiraRoad = lazy(() => import('../pages/sofa-repair/generated/FadedSofaRepairMiraRoad'));

// ── Generated Location × Problem: Water Damaged ──
const WaterDamagedSofaRepairAndheriWest = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairAndheriWest'));
const WaterDamagedSofaRepairAndheriEast = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairAndheriEast'));
const WaterDamagedSofaRepairJogeshwari = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairJogeshwari'));
const WaterDamagedSofaRepairGoregaon = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairGoregaon'));
const WaterDamagedSofaRepairMalad = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairMalad'));
const WaterDamagedSofaRepairKandivali = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairKandivali'));
const WaterDamagedSofaRepairBorivali = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairBorivali'));
const WaterDamagedSofaRepairDahisar = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairDahisar'));
const WaterDamagedSofaRepairBandra = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairBandra'));
const WaterDamagedSofaRepairKhar = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairKhar'));
const WaterDamagedSofaRepairSantacruz = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairSantacruz'));
const WaterDamagedSofaRepairVileParle = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairVileParle'));
const WaterDamagedSofaRepairJuhu = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairJuhu'));
const WaterDamagedSofaRepairVersova = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairVersova'));
const WaterDamagedSofaRepairLokhandwala = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairLokhandwala'));
const WaterDamagedSofaRepairOshiwara = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairOshiwara'));
const WaterDamagedSofaRepairDadar = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairDadar'));
const WaterDamagedSofaRepairSion = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairSion'));
const WaterDamagedSofaRepairMatunga = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairMatunga'));
const WaterDamagedSofaRepairKurla = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairKurla'));
const WaterDamagedSofaRepairGhatkopar = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairGhatkopar'));
const WaterDamagedSofaRepairVikhroli = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairVikhroli'));
const WaterDamagedSofaRepairBhandup = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairBhandup'));
const WaterDamagedSofaRepairMulund = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairMulund'));
const WaterDamagedSofaRepairThane = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairThane'));
const WaterDamagedSofaRepairWadala = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairWadala'));
const WaterDamagedSofaRepairChembur = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairChembur'));
const WaterDamagedSofaRepairNaviMumbai = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairNaviMumbai'));
const WaterDamagedSofaRepairVashi = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairVashi'));
const WaterDamagedSofaRepairPowai = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairPowai'));
const WaterDamagedSofaRepairMiraRoad = lazy(() => import('../pages/sofa-repair/generated/WaterDamagedSofaRepairMiraRoad'));

// ── Generated Location × Problem: Termite Damaged ──
const TermiteDamagedSofaRepairAndheriWest = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairAndheriWest'));
const TermiteDamagedSofaRepairAndheriEast = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairAndheriEast'));
const TermiteDamagedSofaRepairJogeshwari = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairJogeshwari'));
const TermiteDamagedSofaRepairGoregaon = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairGoregaon'));
const TermiteDamagedSofaRepairMalad = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairMalad'));
const TermiteDamagedSofaRepairKandivali = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairKandivali'));
const TermiteDamagedSofaRepairBorivali = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairBorivali'));
const TermiteDamagedSofaRepairDahisar = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairDahisar'));
const TermiteDamagedSofaRepairBandra = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairBandra'));
const TermiteDamagedSofaRepairKhar = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairKhar'));
const TermiteDamagedSofaRepairSantacruz = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairSantacruz'));
const TermiteDamagedSofaRepairVileParle = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairVileParle'));
const TermiteDamagedSofaRepairJuhu = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairJuhu'));
const TermiteDamagedSofaRepairVersova = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairVersova'));
const TermiteDamagedSofaRepairLokhandwala = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairLokhandwala'));
const TermiteDamagedSofaRepairOshiwara = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairOshiwara'));
const TermiteDamagedSofaRepairDadar = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairDadar'));
const TermiteDamagedSofaRepairSion = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairSion'));
const TermiteDamagedSofaRepairMatunga = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairMatunga'));
const TermiteDamagedSofaRepairKurla = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairKurla'));
const TermiteDamagedSofaRepairGhatkopar = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairGhatkopar'));
const TermiteDamagedSofaRepairVikhroli = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairVikhroli'));
const TermiteDamagedSofaRepairBhandup = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairBhandup'));
const TermiteDamagedSofaRepairMulund = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairMulund'));
const TermiteDamagedSofaRepairThane = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairThane'));
const TermiteDamagedSofaRepairWadala = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairWadala'));
const TermiteDamagedSofaRepairChembur = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairChembur'));
const TermiteDamagedSofaRepairNaviMumbai = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairNaviMumbai'));
const TermiteDamagedSofaRepairVashi = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairVashi'));
const TermiteDamagedSofaRepairPowai = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairPowai'));
const TermiteDamagedSofaRepairMiraRoad = lazy(() => import('../pages/sofa-repair/generated/TermiteDamagedSofaRepairMiraRoad'));

// ═══════════════════════════════════════════════════════════════════════
// Route Elements — use inside <Routes> in App.tsx
// ═══════════════════════════════════════════════════════════════════════

export const sofaRepairRoutes = (
  <>
    {/* ── Master & Problem Pages ── */}
    <Route path="/sofa-repair-mumbai" element={<SofaRepairMumbai />} />
    <Route path="/scratched-sofa-repair" element={<ScratchedSofaRepair />} />
    <Route path="/faded-sofa-repair" element={<FadedSofaRepair />} />
    <Route path="/water-damaged-sofa-repair" element={<WaterDamagedSofaRepair />} />
    <Route path="/termite-damaged-sofa-repair" element={<TermiteDamagedSofaRepair />} />

    {/* ── Location Pages ── */}
    <Route path="/sofa-repair-andheri-west" element={<SofaRepairAndheriWest />} />
    <Route path="/sofa-repair-andheri-east" element={<SofaRepairAndheriEast />} />
    <Route path="/sofa-repair-jogeshwari" element={<SofaRepairJogeshwari />} />
    <Route path="/sofa-repair-goregaon" element={<SofaRepairGoregaon />} />
    <Route path="/sofa-repair-malad" element={<SofaRepairMalad />} />
    <Route path="/sofa-repair-kandivali" element={<SofaRepairKandivali />} />
    <Route path="/sofa-repair-borivali" element={<SofaRepairBorivali />} />
    <Route path="/sofa-repair-dahisar" element={<SofaRepairDahisar />} />
    <Route path="/sofa-repair-bandra" element={<SofaRepairBandra />} />
    <Route path="/sofa-repair-khar" element={<SofaRepairKhar />} />
    <Route path="/sofa-repair-santacruz" element={<SofaRepairSantacruz />} />
    <Route path="/sofa-repair-vile-parle" element={<SofaRepairVileParle />} />
    <Route path="/sofa-repair-juhu" element={<SofaRepairJuhu />} />
    <Route path="/sofa-repair-versova" element={<SofaRepairVersova />} />
    <Route path="/sofa-repair-lokhandwala" element={<SofaRepairLokhandwala />} />
    <Route path="/sofa-repair-oshiwara" element={<SofaRepairOshiwara />} />
    <Route path="/sofa-repair-dadar" element={<SofaRepairDadar />} />
    <Route path="/sofa-repair-sion" element={<SofaRepairSion />} />
    <Route path="/sofa-repair-matunga" element={<SofaRepairMatunga />} />
    <Route path="/sofa-repair-kurla" element={<SofaRepairKurla />} />
    <Route path="/sofa-repair-ghatkopar" element={<SofaRepairGhatkopar />} />
    <Route path="/sofa-repair-vikhroli" element={<SofaRepairVikhroli />} />
    <Route path="/sofa-repair-bhandup" element={<SofaRepairBhandup />} />
    <Route path="/sofa-repair-mulund" element={<SofaRepairMulund />} />
    <Route path="/sofa-repair-thane" element={<SofaRepairThane />} />
    <Route path="/sofa-repair-wadala" element={<SofaRepairWadala />} />
    <Route path="/sofa-repair-chembur" element={<SofaRepairChembur />} />
    <Route path="/sofa-repair-navi-mumbai" element={<SofaRepairNaviMumbai />} />
    <Route path="/sofa-repair-vashi" element={<SofaRepairVashi />} />
    <Route path="/sofa-repair-powai" element={<SofaRepairPowai />} />
    <Route path="/sofa-repair-mira-road" element={<SofaRepairMiraRoad />} />

    {/* ── Scratched × Location ── */}
    <Route path="/scratched-sofa-repair-andheri-west" element={<ScratchedSofaRepairAndheriWest />} />
    <Route path="/scratched-sofa-repair-andheri-east" element={<ScratchedSofaRepairAndheriEast />} />
    <Route path="/scratched-sofa-repair-jogeshwari" element={<ScratchedSofaRepairJogeshwari />} />
    <Route path="/scratched-sofa-repair-goregaon" element={<ScratchedSofaRepairGoregaon />} />
    <Route path="/scratched-sofa-repair-malad" element={<ScratchedSofaRepairMalad />} />
    <Route path="/scratched-sofa-repair-kandivali" element={<ScratchedSofaRepairKandivali />} />
    <Route path="/scratched-sofa-repair-borivali" element={<ScratchedSofaRepairBorivali />} />
    <Route path="/scratched-sofa-repair-dahisar" element={<ScratchedSofaRepairDahisar />} />
    <Route path="/scratched-sofa-repair-bandra" element={<ScratchedSofaRepairBandra />} />
    <Route path="/scratched-sofa-repair-khar" element={<ScratchedSofaRepairKhar />} />
    <Route path="/scratched-sofa-repair-santacruz" element={<ScratchedSofaRepairSantacruz />} />
    <Route path="/scratched-sofa-repair-vile-parle" element={<ScratchedSofaRepairVileParle />} />
    <Route path="/scratched-sofa-repair-juhu" element={<ScratchedSofaRepairJuhu />} />
    <Route path="/scratched-sofa-repair-versova" element={<ScratchedSofaRepairVersova />} />
    <Route path="/scratched-sofa-repair-lokhandwala" element={<ScratchedSofaRepairLokhandwala />} />
    <Route path="/scratched-sofa-repair-oshiwara" element={<ScratchedSofaRepairOshiwara />} />
    <Route path="/scratched-sofa-repair-dadar" element={<ScratchedSofaRepairDadar />} />
    <Route path="/scratched-sofa-repair-sion" element={<ScratchedSofaRepairSion />} />
    <Route path="/scratched-sofa-repair-matunga" element={<ScratchedSofaRepairMatunga />} />
    <Route path="/scratched-sofa-repair-kurla" element={<ScratchedSofaRepairKurla />} />
    <Route path="/scratched-sofa-repair-ghatkopar" element={<ScratchedSofaRepairGhatkopar />} />
    <Route path="/scratched-sofa-repair-vikhroli" element={<ScratchedSofaRepairVikhroli />} />
    <Route path="/scratched-sofa-repair-bhandup" element={<ScratchedSofaRepairBhandup />} />
    <Route path="/scratched-sofa-repair-mulund" element={<ScratchedSofaRepairMulund />} />
    <Route path="/scratched-sofa-repair-thane" element={<ScratchedSofaRepairThane />} />
    <Route path="/scratched-sofa-repair-wadala" element={<ScratchedSofaRepairWadala />} />
    <Route path="/scratched-sofa-repair-chembur" element={<ScratchedSofaRepairChembur />} />
    <Route path="/scratched-sofa-repair-navi-mumbai" element={<ScratchedSofaRepairNaviMumbai />} />
    <Route path="/scratched-sofa-repair-vashi" element={<ScratchedSofaRepairVashi />} />
    <Route path="/scratched-sofa-repair-powai" element={<ScratchedSofaRepairPowai />} />
    <Route path="/scratched-sofa-repair-mira-road" element={<ScratchedSofaRepairMiraRoad />} />

    {/* ── Faded × Location ── */}
    <Route path="/faded-sofa-repair-andheri-west" element={<FadedSofaRepairAndheriWest />} />
    <Route path="/faded-sofa-repair-andheri-east" element={<FadedSofaRepairAndheriEast />} />
    <Route path="/faded-sofa-repair-jogeshwari" element={<FadedSofaRepairJogeshwari />} />
    <Route path="/faded-sofa-repair-goregaon" element={<FadedSofaRepairGoregaon />} />
    <Route path="/faded-sofa-repair-malad" element={<FadedSofaRepairMalad />} />
    <Route path="/faded-sofa-repair-kandivali" element={<FadedSofaRepairKandivali />} />
    <Route path="/faded-sofa-repair-borivali" element={<FadedSofaRepairBorivali />} />
    <Route path="/faded-sofa-repair-dahisar" element={<FadedSofaRepairDahisar />} />
    <Route path="/faded-sofa-repair-bandra" element={<FadedSofaRepairBandra />} />
    <Route path="/faded-sofa-repair-khar" element={<FadedSofaRepairKhar />} />
    <Route path="/faded-sofa-repair-santacruz" element={<FadedSofaRepairSantacruz />} />
    <Route path="/faded-sofa-repair-vile-parle" element={<FadedSofaRepairVileParle />} />
    <Route path="/faded-sofa-repair-juhu" element={<FadedSofaRepairJuhu />} />
    <Route path="/faded-sofa-repair-versova" element={<FadedSofaRepairVersova />} />
    <Route path="/faded-sofa-repair-lokhandwala" element={<FadedSofaRepairLokhandwala />} />
    <Route path="/faded-sofa-repair-oshiwara" element={<FadedSofaRepairOshiwara />} />
    <Route path="/faded-sofa-repair-dadar" element={<FadedSofaRepairDadar />} />
    <Route path="/faded-sofa-repair-sion" element={<FadedSofaRepairSion />} />
    <Route path="/faded-sofa-repair-matunga" element={<FadedSofaRepairMatunga />} />
    <Route path="/faded-sofa-repair-kurla" element={<FadedSofaRepairKurla />} />
    <Route path="/faded-sofa-repair-ghatkopar" element={<FadedSofaRepairGhatkopar />} />
    <Route path="/faded-sofa-repair-vikhroli" element={<FadedSofaRepairVikhroli />} />
    <Route path="/faded-sofa-repair-bhandup" element={<FadedSofaRepairBhandup />} />
    <Route path="/faded-sofa-repair-mulund" element={<FadedSofaRepairMulund />} />
    <Route path="/faded-sofa-repair-thane" element={<FadedSofaRepairThane />} />
    <Route path="/faded-sofa-repair-wadala" element={<FadedSofaRepairWadala />} />
    <Route path="/faded-sofa-repair-chembur" element={<FadedSofaRepairChembur />} />
    <Route path="/faded-sofa-repair-navi-mumbai" element={<FadedSofaRepairNaviMumbai />} />
    <Route path="/faded-sofa-repair-vashi" element={<FadedSofaRepairVashi />} />
    <Route path="/faded-sofa-repair-powai" element={<FadedSofaRepairPowai />} />
    <Route path="/faded-sofa-repair-mira-road" element={<FadedSofaRepairMiraRoad />} />

    {/* ── Water Damaged × Location ── */}
    <Route path="/water-damaged-sofa-repair-andheri-west" element={<WaterDamagedSofaRepairAndheriWest />} />
    <Route path="/water-damaged-sofa-repair-andheri-east" element={<WaterDamagedSofaRepairAndheriEast />} />
    <Route path="/water-damaged-sofa-repair-jogeshwari" element={<WaterDamagedSofaRepairJogeshwari />} />
    <Route path="/water-damaged-sofa-repair-goregaon" element={<WaterDamagedSofaRepairGoregaon />} />
    <Route path="/water-damaged-sofa-repair-malad" element={<WaterDamagedSofaRepairMalad />} />
    <Route path="/water-damaged-sofa-repair-kandivali" element={<WaterDamagedSofaRepairKandivali />} />
    <Route path="/water-damaged-sofa-repair-borivali" element={<WaterDamagedSofaRepairBorivali />} />
    <Route path="/water-damaged-sofa-repair-dahisar" element={<WaterDamagedSofaRepairDahisar />} />
    <Route path="/water-damaged-sofa-repair-bandra" element={<WaterDamagedSofaRepairBandra />} />
    <Route path="/water-damaged-sofa-repair-khar" element={<WaterDamagedSofaRepairKhar />} />
    <Route path="/water-damaged-sofa-repair-santacruz" element={<WaterDamagedSofaRepairSantacruz />} />
    <Route path="/water-damaged-sofa-repair-vile-parle" element={<WaterDamagedSofaRepairVileParle />} />
    <Route path="/water-damaged-sofa-repair-juhu" element={<WaterDamagedSofaRepairJuhu />} />
    <Route path="/water-damaged-sofa-repair-versova" element={<WaterDamagedSofaRepairVersova />} />
    <Route path="/water-damaged-sofa-repair-lokhandwala" element={<WaterDamagedSofaRepairLokhandwala />} />
    <Route path="/water-damaged-sofa-repair-oshiwara" element={<WaterDamagedSofaRepairOshiwara />} />
    <Route path="/water-damaged-sofa-repair-dadar" element={<WaterDamagedSofaRepairDadar />} />
    <Route path="/water-damaged-sofa-repair-sion" element={<WaterDamagedSofaRepairSion />} />
    <Route path="/water-damaged-sofa-repair-matunga" element={<WaterDamagedSofaRepairMatunga />} />
    <Route path="/water-damaged-sofa-repair-kurla" element={<WaterDamagedSofaRepairKurla />} />
    <Route path="/water-damaged-sofa-repair-ghatkopar" element={<WaterDamagedSofaRepairGhatkopar />} />
    <Route path="/water-damaged-sofa-repair-vikhroli" element={<WaterDamagedSofaRepairVikhroli />} />
    <Route path="/water-damaged-sofa-repair-bhandup" element={<WaterDamagedSofaRepairBhandup />} />
    <Route path="/water-damaged-sofa-repair-mulund" element={<WaterDamagedSofaRepairMulund />} />
    <Route path="/water-damaged-sofa-repair-thane" element={<WaterDamagedSofaRepairThane />} />
    <Route path="/water-damaged-sofa-repair-wadala" element={<WaterDamagedSofaRepairWadala />} />
    <Route path="/water-damaged-sofa-repair-chembur" element={<WaterDamagedSofaRepairChembur />} />
    <Route path="/water-damaged-sofa-repair-navi-mumbai" element={<WaterDamagedSofaRepairNaviMumbai />} />
    <Route path="/water-damaged-sofa-repair-vashi" element={<WaterDamagedSofaRepairVashi />} />
    <Route path="/water-damaged-sofa-repair-powai" element={<WaterDamagedSofaRepairPowai />} />
    <Route path="/water-damaged-sofa-repair-mira-road" element={<WaterDamagedSofaRepairMiraRoad />} />

    {/* ── Termite Damaged × Location ── */}
    <Route path="/termite-damaged-sofa-repair-andheri-west" element={<TermiteDamagedSofaRepairAndheriWest />} />
    <Route path="/termite-damaged-sofa-repair-andheri-east" element={<TermiteDamagedSofaRepairAndheriEast />} />
    <Route path="/termite-damaged-sofa-repair-jogeshwari" element={<TermiteDamagedSofaRepairJogeshwari />} />
    <Route path="/termite-damaged-sofa-repair-goregaon" element={<TermiteDamagedSofaRepairGoregaon />} />
    <Route path="/termite-damaged-sofa-repair-malad" element={<TermiteDamagedSofaRepairMalad />} />
    <Route path="/termite-damaged-sofa-repair-kandivali" element={<TermiteDamagedSofaRepairKandivali />} />
    <Route path="/termite-damaged-sofa-repair-borivali" element={<TermiteDamagedSofaRepairBorivali />} />
    <Route path="/termite-damaged-sofa-repair-dahisar" element={<TermiteDamagedSofaRepairDahisar />} />
    <Route path="/termite-damaged-sofa-repair-bandra" element={<TermiteDamagedSofaRepairBandra />} />
    <Route path="/termite-damaged-sofa-repair-khar" element={<TermiteDamagedSofaRepairKhar />} />
    <Route path="/termite-damaged-sofa-repair-santacruz" element={<TermiteDamagedSofaRepairSantacruz />} />
    <Route path="/termite-damaged-sofa-repair-vile-parle" element={<TermiteDamagedSofaRepairVileParle />} />
    <Route path="/termite-damaged-sofa-repair-juhu" element={<TermiteDamagedSofaRepairJuhu />} />
    <Route path="/termite-damaged-sofa-repair-versova" element={<TermiteDamagedSofaRepairVersova />} />
    <Route path="/termite-damaged-sofa-repair-lokhandwala" element={<TermiteDamagedSofaRepairLokhandwala />} />
    <Route path="/termite-damaged-sofa-repair-oshiwara" element={<TermiteDamagedSofaRepairOshiwara />} />
    <Route path="/termite-damaged-sofa-repair-dadar" element={<TermiteDamagedSofaRepairDadar />} />
    <Route path="/termite-damaged-sofa-repair-sion" element={<TermiteDamagedSofaRepairSion />} />
    <Route path="/termite-damaged-sofa-repair-matunga" element={<TermiteDamagedSofaRepairMatunga />} />
    <Route path="/termite-damaged-sofa-repair-kurla" element={<TermiteDamagedSofaRepairKurla />} />
    <Route path="/termite-damaged-sofa-repair-ghatkopar" element={<TermiteDamagedSofaRepairGhatkopar />} />
    <Route path="/termite-damaged-sofa-repair-vikhroli" element={<TermiteDamagedSofaRepairVikhroli />} />
    <Route path="/termite-damaged-sofa-repair-bhandup" element={<TermiteDamagedSofaRepairBhandup />} />
    <Route path="/termite-damaged-sofa-repair-mulund" element={<TermiteDamagedSofaRepairMulund />} />
    <Route path="/termite-damaged-sofa-repair-thane" element={<TermiteDamagedSofaRepairThane />} />
    <Route path="/termite-damaged-sofa-repair-wadala" element={<TermiteDamagedSofaRepairWadala />} />
    <Route path="/termite-damaged-sofa-repair-chembur" element={<TermiteDamagedSofaRepairChembur />} />
    <Route path="/termite-damaged-sofa-repair-navi-mumbai" element={<TermiteDamagedSofaRepairNaviMumbai />} />
    <Route path="/termite-damaged-sofa-repair-vashi" element={<TermiteDamagedSofaRepairVashi />} />
    <Route path="/termite-damaged-sofa-repair-powai" element={<TermiteDamagedSofaRepairPowai />} />
    <Route path="/termite-damaged-sofa-repair-mira-road" element={<TermiteDamagedSofaRepairMiraRoad />} />
  </>
);

export default sofaRepairRoutes;
