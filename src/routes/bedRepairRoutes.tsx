/**
 * Bed Repair Routes — all 96 bed repair SEO pages
 *
 * This file provides a single exported JSX fragment that renders all bed repair routes.
 * Import and include {bedRepairRoutes} inside your <Routes> in App.tsx.
 *
 * Structure:
 * - 1 master page: /bed-repair-mumbai
 * - 4 problem pages: /scratched-bed-repair, /faded-bed-repair, etc.
 * - 6 wood type pages: /veneer-bed-polish, /solid-wood-bed-polish, etc.
 * - 17 location pages: /bed-repair-{location}
 * - 68 location+problem pages: /{problem}-{location}
 */

import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

// ── Hand-crafted pages (master + problems + wood types) ──
const BedRepairMumbai = lazy(() => import('../pages/bed-repair/BedRepairMumbai'));
const ScratchedBedRepair = lazy(() => import('../pages/bed-repair/ScratchedBedRepair'));
const FadedBedRepair = lazy(() => import('../pages/bed-repair/FadedBedRepair'));
const WaterDamagedBedRepair = lazy(() => import('../pages/bed-repair/WaterDamagedBedRepair'));
const TermiteDamagedBedRepair = lazy(() => import('../pages/bed-repair/TermiteDamagedBedRepair'));
const VeneerBedPolish = lazy(() => import('../pages/bed-repair/VeneerBedPolish'));
const SolidWoodBedPolish = lazy(() => import('../pages/bed-repair/SolidWoodBedPolish'));
const TeakwoodBedPolish = lazy(() => import('../pages/bed-repair/TeakwoodBedPolish'));
const WalnutBedPolish = lazy(() => import('../pages/bed-repair/WalnutBedPolish'));
const MdfBedRepair = lazy(() => import('../pages/bed-repair/MdfBedRepair'));
const PlywoodBedRepair = lazy(() => import('../pages/bed-repair/PlywoodBedRepair'));

// ── Generated Location Pages (17) ──
const BedRepairAndheriWest = lazy(() => import('../pages/bed-repair/generated/BedRepairAndheriWest'));
const BedRepairAndheriEast = lazy(() => import('../pages/bed-repair/generated/BedRepairAndheriEast'));
const BedRepairGoregaon = lazy(() => import('../pages/bed-repair/generated/BedRepairGoregaon'));
const BedRepairMalad = lazy(() => import('../pages/bed-repair/generated/BedRepairMalad'));
const BedRepairKandivali = lazy(() => import('../pages/bed-repair/generated/BedRepairKandivali'));
const BedRepairBorivali = lazy(() => import('../pages/bed-repair/generated/BedRepairBorivali'));
const BedRepairBandra = lazy(() => import('../pages/bed-repair/generated/BedRepairBandra'));
const BedRepairJogeshwari = lazy(() => import('../pages/bed-repair/generated/BedRepairJogeshwari'));
const BedRepairVileParle = lazy(() => import('../pages/bed-repair/generated/BedRepairVileParle'));
const BedRepairJuhu = lazy(() => import('../pages/bed-repair/generated/BedRepairJuhu'));
const BedRepairLokhandwala = lazy(() => import('../pages/bed-repair/generated/BedRepairLokhandwala'));
const BedRepairDadar = lazy(() => import('../pages/bed-repair/generated/BedRepairDadar'));
const BedRepairKurla = lazy(() => import('../pages/bed-repair/generated/BedRepairKurla'));
const BedRepairThane = lazy(() => import('../pages/bed-repair/generated/BedRepairThane'));
const BedRepairPowai = lazy(() => import('../pages/bed-repair/generated/BedRepairPowai'));
const BedRepairNaviMumbai = lazy(() => import('../pages/bed-repair/generated/BedRepairNaviMumbai'));
const BedRepairChembur = lazy(() => import('../pages/bed-repair/generated/BedRepairChembur'));

// ── Generated Location × Problem: Scratched (17) ──
const ScratchedBedRepairAndheriWest = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairAndheriWest'));
const ScratchedBedRepairAndheriEast = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairAndheriEast'));
const ScratchedBedRepairGoregaon = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairGoregaon'));
const ScratchedBedRepairMalad = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairMalad'));
const ScratchedBedRepairKandivali = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairKandivali'));
const ScratchedBedRepairBorivali = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairBorivali'));
const ScratchedBedRepairBandra = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairBandra'));
const ScratchedBedRepairJogeshwari = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairJogeshwari'));
const ScratchedBedRepairVileParle = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairVileParle'));
const ScratchedBedRepairJuhu = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairJuhu'));
const ScratchedBedRepairLokhandwala = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairLokhandwala'));
const ScratchedBedRepairDadar = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairDadar'));
const ScratchedBedRepairKurla = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairKurla'));
const ScratchedBedRepairThane = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairThane'));
const ScratchedBedRepairPowai = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairPowai'));
const ScratchedBedRepairNaviMumbai = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairNaviMumbai'));
const ScratchedBedRepairChembur = lazy(() => import('../pages/bed-repair/generated/ScratchedBedRepairChembur'));

// ── Generated Location × Problem: Faded (17) ──
const FadedBedRepairAndheriWest = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairAndheriWest'));
const FadedBedRepairAndheriEast = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairAndheriEast'));
const FadedBedRepairGoregaon = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairGoregaon'));
const FadedBedRepairMalad = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairMalad'));
const FadedBedRepairKandivali = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairKandivali'));
const FadedBedRepairBorivali = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairBorivali'));
const FadedBedRepairBandra = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairBandra'));
const FadedBedRepairJogeshwari = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairJogeshwari'));
const FadedBedRepairVileParle = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairVileParle'));
const FadedBedRepairJuhu = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairJuhu'));
const FadedBedRepairLokhandwala = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairLokhandwala'));
const FadedBedRepairDadar = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairDadar'));
const FadedBedRepairKurla = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairKurla'));
const FadedBedRepairThane = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairThane'));
const FadedBedRepairPowai = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairPowai'));
const FadedBedRepairNaviMumbai = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairNaviMumbai'));
const FadedBedRepairChembur = lazy(() => import('../pages/bed-repair/generated/FadedBedRepairChembur'));

// ── Generated Location × Problem: Water Damaged (17) ──
const WaterDamagedBedRepairAndheriWest = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairAndheriWest'));
const WaterDamagedBedRepairAndheriEast = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairAndheriEast'));
const WaterDamagedBedRepairGoregaon = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairGoregaon'));
const WaterDamagedBedRepairMalad = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairMalad'));
const WaterDamagedBedRepairKandivali = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairKandivali'));
const WaterDamagedBedRepairBorivali = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairBorivali'));
const WaterDamagedBedRepairBandra = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairBandra'));
const WaterDamagedBedRepairJogeshwari = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairJogeshwari'));
const WaterDamagedBedRepairVileParle = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairVileParle'));
const WaterDamagedBedRepairJuhu = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairJuhu'));
const WaterDamagedBedRepairLokhandwala = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairLokhandwala'));
const WaterDamagedBedRepairDadar = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairDadar'));
const WaterDamagedBedRepairKurla = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairKurla'));
const WaterDamagedBedRepairThane = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairThane'));
const WaterDamagedBedRepairPowai = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairPowai'));
const WaterDamagedBedRepairNaviMumbai = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairNaviMumbai'));
const WaterDamagedBedRepairChembur = lazy(() => import('../pages/bed-repair/generated/WaterDamagedBedRepairChembur'));

// ── Generated Location × Problem: Termite Damaged (17) ──
const TermiteDamagedBedRepairAndheriWest = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairAndheriWest'));
const TermiteDamagedBedRepairAndheriEast = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairAndheriEast'));
const TermiteDamagedBedRepairGoregaon = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairGoregaon'));
const TermiteDamagedBedRepairMalad = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairMalad'));
const TermiteDamagedBedRepairKandivali = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairKandivali'));
const TermiteDamagedBedRepairBorivali = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairBorivali'));
const TermiteDamagedBedRepairBandra = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairBandra'));
const TermiteDamagedBedRepairJogeshwari = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairJogeshwari'));
const TermiteDamagedBedRepairVileParle = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairVileParle'));
const TermiteDamagedBedRepairJuhu = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairJuhu'));
const TermiteDamagedBedRepairLokhandwala = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairLokhandwala'));
const TermiteDamagedBedRepairDadar = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairDadar'));
const TermiteDamagedBedRepairKurla = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairKurla'));
const TermiteDamagedBedRepairThane = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairThane'));
const TermiteDamagedBedRepairPowai = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairPowai'));
const TermiteDamagedBedRepairNaviMumbai = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairNaviMumbai'));
const TermiteDamagedBedRepairChembur = lazy(() => import('../pages/bed-repair/generated/TermiteDamagedBedRepairChembur'));

// ═══════════════════════════════════════════════════════════════════════
// Route Elements — use inside <Routes> in App.tsx
// ═══════════════════════════════════════════════════════════════════════

export const bedRepairRoutes = (
  <>
    {/* ── Master Page ── */}
    <Route path="/bed-repair-mumbai" element={<BedRepairMumbai />} />

    {/* ── Problem Pages (4) ── */}
    <Route path="/scratched-bed-repair" element={<ScratchedBedRepair />} />
    <Route path="/faded-bed-repair" element={<FadedBedRepair />} />
    <Route path="/water-damaged-bed-repair" element={<WaterDamagedBedRepair />} />
    <Route path="/termite-damaged-bed-repair" element={<TermiteDamagedBedRepair />} />

    {/* ── Wood Type Pages (6) ── */}
    <Route path="/veneer-bed-polish" element={<VeneerBedPolish />} />
    <Route path="/solid-wood-bed-polish" element={<SolidWoodBedPolish />} />
    <Route path="/teakwood-bed-polish" element={<TeakwoodBedPolish />} />
    <Route path="/walnut-bed-polish" element={<WalnutBedPolish />} />
    <Route path="/mdf-bed-repair" element={<MdfBedRepair />} />
    <Route path="/plywood-bed-repair" element={<PlywoodBedRepair />} />

    {/* ── Location Pages (17) ── */}
    <Route path="/bed-repair-andheri-west" element={<BedRepairAndheriWest />} />
    <Route path="/bed-repair-andheri-east" element={<BedRepairAndheriEast />} />
    <Route path="/bed-repair-goregaon" element={<BedRepairGoregaon />} />
    <Route path="/bed-repair-malad" element={<BedRepairMalad />} />
    <Route path="/bed-repair-kandivali" element={<BedRepairKandivali />} />
    <Route path="/bed-repair-borivali" element={<BedRepairBorivali />} />
    <Route path="/bed-repair-bandra" element={<BedRepairBandra />} />
    <Route path="/bed-repair-jogeshwari" element={<BedRepairJogeshwari />} />
    <Route path="/bed-repair-vile-parle" element={<BedRepairVileParle />} />
    <Route path="/bed-repair-juhu" element={<BedRepairJuhu />} />
    <Route path="/bed-repair-lokhandwala" element={<BedRepairLokhandwala />} />
    <Route path="/bed-repair-dadar" element={<BedRepairDadar />} />
    <Route path="/bed-repair-kurla" element={<BedRepairKurla />} />
    <Route path="/bed-repair-thane" element={<BedRepairThane />} />
    <Route path="/bed-repair-powai" element={<BedRepairPowai />} />
    <Route path="/bed-repair-navi-mumbai" element={<BedRepairNaviMumbai />} />
    <Route path="/bed-repair-chembur" element={<BedRepairChembur />} />

    {/* ── Scratched × Location (17) ── */}
    <Route path="/scratched-bed-repair-andheri-west" element={<ScratchedBedRepairAndheriWest />} />
    <Route path="/scratched-bed-repair-andheri-east" element={<ScratchedBedRepairAndheriEast />} />
    <Route path="/scratched-bed-repair-goregaon" element={<ScratchedBedRepairGoregaon />} />
    <Route path="/scratched-bed-repair-malad" element={<ScratchedBedRepairMalad />} />
    <Route path="/scratched-bed-repair-kandivali" element={<ScratchedBedRepairKandivali />} />
    <Route path="/scratched-bed-repair-borivali" element={<ScratchedBedRepairBorivali />} />
    <Route path="/scratched-bed-repair-bandra" element={<ScratchedBedRepairBandra />} />
    <Route path="/scratched-bed-repair-jogeshwari" element={<ScratchedBedRepairJogeshwari />} />
    <Route path="/scratched-bed-repair-vile-parle" element={<ScratchedBedRepairVileParle />} />
    <Route path="/scratched-bed-repair-juhu" element={<ScratchedBedRepairJuhu />} />
    <Route path="/scratched-bed-repair-lokhandwala" element={<ScratchedBedRepairLokhandwala />} />
    <Route path="/scratched-bed-repair-dadar" element={<ScratchedBedRepairDadar />} />
    <Route path="/scratched-bed-repair-kurla" element={<ScratchedBedRepairKurla />} />
    <Route path="/scratched-bed-repair-thane" element={<ScratchedBedRepairThane />} />
    <Route path="/scratched-bed-repair-powai" element={<ScratchedBedRepairPowai />} />
    <Route path="/scratched-bed-repair-navi-mumbai" element={<ScratchedBedRepairNaviMumbai />} />
    <Route path="/scratched-bed-repair-chembur" element={<ScratchedBedRepairChembur />} />

    {/* ── Faded × Location (17) ── */}
    <Route path="/faded-bed-repair-andheri-west" element={<FadedBedRepairAndheriWest />} />
    <Route path="/faded-bed-repair-andheri-east" element={<FadedBedRepairAndheriEast />} />
    <Route path="/faded-bed-repair-goregaon" element={<FadedBedRepairGoregaon />} />
    <Route path="/faded-bed-repair-malad" element={<FadedBedRepairMalad />} />
    <Route path="/faded-bed-repair-kandivali" element={<FadedBedRepairKandivali />} />
    <Route path="/faded-bed-repair-borivali" element={<FadedBedRepairBorivali />} />
    <Route path="/faded-bed-repair-bandra" element={<FadedBedRepairBandra />} />
    <Route path="/faded-bed-repair-jogeshwari" element={<FadedBedRepairJogeshwari />} />
    <Route path="/faded-bed-repair-vile-parle" element={<FadedBedRepairVileParle />} />
    <Route path="/faded-bed-repair-juhu" element={<FadedBedRepairJuhu />} />
    <Route path="/faded-bed-repair-lokhandwala" element={<FadedBedRepairLokhandwala />} />
    <Route path="/faded-bed-repair-dadar" element={<FadedBedRepairDadar />} />
    <Route path="/faded-bed-repair-kurla" element={<FadedBedRepairKurla />} />
    <Route path="/faded-bed-repair-thane" element={<FadedBedRepairThane />} />
    <Route path="/faded-bed-repair-powai" element={<FadedBedRepairPowai />} />
    <Route path="/faded-bed-repair-navi-mumbai" element={<FadedBedRepairNaviMumbai />} />
    <Route path="/faded-bed-repair-chembur" element={<FadedBedRepairChembur />} />

    {/* ── Water Damaged × Location (17) ── */}
    <Route path="/water-damaged-bed-repair-andheri-west" element={<WaterDamagedBedRepairAndheriWest />} />
    <Route path="/water-damaged-bed-repair-andheri-east" element={<WaterDamagedBedRepairAndheriEast />} />
    <Route path="/water-damaged-bed-repair-goregaon" element={<WaterDamagedBedRepairGoregaon />} />
    <Route path="/water-damaged-bed-repair-malad" element={<WaterDamagedBedRepairMalad />} />
    <Route path="/water-damaged-bed-repair-kandivali" element={<WaterDamagedBedRepairKandivali />} />
    <Route path="/water-damaged-bed-repair-borivali" element={<WaterDamagedBedRepairBorivali />} />
    <Route path="/water-damaged-bed-repair-bandra" element={<WaterDamagedBedRepairBandra />} />
    <Route path="/water-damaged-bed-repair-jogeshwari" element={<WaterDamagedBedRepairJogeshwari />} />
    <Route path="/water-damaged-bed-repair-vile-parle" element={<WaterDamagedBedRepairVileParle />} />
    <Route path="/water-damaged-bed-repair-juhu" element={<WaterDamagedBedRepairJuhu />} />
    <Route path="/water-damaged-bed-repair-lokhandwala" element={<WaterDamagedBedRepairLokhandwala />} />
    <Route path="/water-damaged-bed-repair-dadar" element={<WaterDamagedBedRepairDadar />} />
    <Route path="/water-damaged-bed-repair-kurla" element={<WaterDamagedBedRepairKurla />} />
    <Route path="/water-damaged-bed-repair-thane" element={<WaterDamagedBedRepairThane />} />
    <Route path="/water-damaged-bed-repair-powai" element={<WaterDamagedBedRepairPowai />} />
    <Route path="/water-damaged-bed-repair-navi-mumbai" element={<WaterDamagedBedRepairNaviMumbai />} />
    <Route path="/water-damaged-bed-repair-chembur" element={<WaterDamagedBedRepairChembur />} />

    {/* ── Termite Damaged × Location (17) ── */}
    <Route path="/termite-damaged-bed-repair-andheri-west" element={<TermiteDamagedBedRepairAndheriWest />} />
    <Route path="/termite-damaged-bed-repair-andheri-east" element={<TermiteDamagedBedRepairAndheriEast />} />
    <Route path="/termite-damaged-bed-repair-goregaon" element={<TermiteDamagedBedRepairGoregaon />} />
    <Route path="/termite-damaged-bed-repair-malad" element={<TermiteDamagedBedRepairMalad />} />
    <Route path="/termite-damaged-bed-repair-kandivali" element={<TermiteDamagedBedRepairKandivali />} />
    <Route path="/termite-damaged-bed-repair-borivali" element={<TermiteDamagedBedRepairBorivali />} />
    <Route path="/termite-damaged-bed-repair-bandra" element={<TermiteDamagedBedRepairBandra />} />
    <Route path="/termite-damaged-bed-repair-jogeshwari" element={<TermiteDamagedBedRepairJogeshwari />} />
    <Route path="/termite-damaged-bed-repair-vile-parle" element={<TermiteDamagedBedRepairVileParle />} />
    <Route path="/termite-damaged-bed-repair-juhu" element={<TermiteDamagedBedRepairJuhu />} />
    <Route path="/termite-damaged-bed-repair-lokhandwala" element={<TermiteDamagedBedRepairLokhandwala />} />
    <Route path="/termite-damaged-bed-repair-dadar" element={<TermiteDamagedBedRepairDadar />} />
    <Route path="/termite-damaged-bed-repair-kurla" element={<TermiteDamagedBedRepairKurla />} />
    <Route path="/termite-damaged-bed-repair-thane" element={<TermiteDamagedBedRepairThane />} />
    <Route path="/termite-damaged-bed-repair-powai" element={<TermiteDamagedBedRepairPowai />} />
    <Route path="/termite-damaged-bed-repair-navi-mumbai" element={<TermiteDamagedBedRepairNaviMumbai />} />
    <Route path="/termite-damaged-bed-repair-chembur" element={<TermiteDamagedBedRepairChembur />} />
  </>
);

export default bedRepairRoutes;
