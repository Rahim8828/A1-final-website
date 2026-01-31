/**
 * CTA and Booking Flow Testing Script
 * Tests CTAs placement, functionality, and booking flow
 * Requirements: 10.1, 10.2, 10.3, 10.5
 */

import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  testName: string;
  passed: boolean;
  details: string[];
  warnings: string[];
}

interface CTATestReport {
  totalTests: number;
  passed: number;
  failed: number;
  warnings: number;
  results: TestResult[];
}

class CTAAndBookingFlowTest {
  private report: CTATestReport = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    results: [],
  };

  /**
   * Test 1: Verify CTAs above the fold (hero section)
   */
  testCTAsAboveFold(): TestResult {
    const result: TestResult = {
      testName: 'CTAs Above the Fold',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Extract hero section
      const heroSectionMatch = content.match(/{\/\* Hero Section \*\/}[\s\S]*?<\/section>/);
      
      if (!heroSectionMatch) {
        result.passed = false;
        result.details.push('✗ Hero section not found');
        return result;
      }

      const heroSection = heroSectionMatch[0];

      // Check for Call CTA
      const hasCallCTA = heroSection.includes('tel:+918828709945');
      if (hasCallCTA) {
        result.details.push('✓ Call CTA present in hero section');
      } else {
        result.passed = false;
        result.details.push('✗ Call CTA missing in hero section');
      }

      // Check for WhatsApp CTA
      const hasWhatsAppCTA = heroSection.includes('wa.me/918828709945');
      if (hasWhatsAppCTA) {
        result.details.push('✓ WhatsApp CTA present in hero section');
      } else {
        result.passed = false;
        result.details.push('✗ WhatsApp CTA missing in hero section');
      }

      // Check for CTA button styling (prominent)
      const hasProminentStyling = heroSection.includes('bg-amber-600') && 
                                   heroSection.includes('bg-green-600');
      if (hasProminentStyling) {
        result.details.push('✓ CTAs have prominent styling');
      }

      // Check for CTA text
      const hasCallText = heroSection.includes('Call Now') || heroSection.includes('Call');
      const hasWhatsAppText = heroSection.includes('WhatsApp');
      
      if (hasCallText && hasWhatsAppText) {
        result.details.push('✓ CTAs have clear action text');
      }

      // Count total CTAs in hero
      const ctaCount = (heroSection.match(/href="(?:tel:|https:\/\/wa\.me)/g) || []).length;
      result.details.push(`✓ Found ${ctaCount} CTAs in hero section`);

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 2: Verify CTAs throughout the page
   */
  testCTAsThroughoutPage(): TestResult {
    const result: TestResult = {
      testName: 'CTAs Throughout Page',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Count all phone CTAs
      const phonePattern = /href="tel:\+918828709945"/g;
      const phoneMatches = content.match(phonePattern);
      const phoneCount = phoneMatches ? phoneMatches.length : 0;

      // Count all WhatsApp CTAs
      const whatsappPattern = /href="https:\/\/wa\.me\/918828709945/g;
      const whatsappMatches = content.match(whatsappPattern);
      const whatsappCount = whatsappMatches ? whatsappMatches.length : 0;

      const totalCTAs = phoneCount + whatsappCount;

      result.details.push(`✓ Found ${phoneCount} phone CTAs`);
      result.details.push(`✓ Found ${whatsappCount} WhatsApp CTAs`);
      result.details.push(`✓ Total CTAs: ${totalCTAs}`);

      // Requirement: CTAs should be present at strategic points
      // Expected: Hero, Service List, Location, Pricing, FAQ, Final CTA = at least 10 CTAs
      if (totalCTAs >= 10) {
        result.details.push('✓ Adequate CTA distribution throughout page');
      } else {
        result.warnings.push(`Only ${totalCTAs} CTAs found (recommended: 10+)`);
      }

      // Check for CTAs in key sections
      const sections = [
        { name: 'Service List', pattern: /{\/\* Service List Section \*\/}[\s\S]*?<\/section>/ },
        { name: 'Location Coverage', pattern: /{\/\* Location Coverage Section \*\/}[\s\S]*?<\/section>/ },
        { name: 'Pricing', pattern: /{\/\* Pricing Section \*\/}[\s\S]*?<\/section>/ },
        { name: 'FAQ', pattern: /{\/\* FAQ Section \*\/}[\s\S]*?<\/section>/ },
        { name: 'Final CTA', pattern: /{\/\* Final CTA Section \*\/}[\s\S]*?<\/section>/ },
      ];

      let sectionsWithCTAs = 0;
      sections.forEach(section => {
        const sectionMatch = content.match(section.pattern);
        if (sectionMatch) {
          const hasCTA = sectionMatch[0].includes('tel:') || sectionMatch[0].includes('wa.me');
          if (hasCTA) {
            sectionsWithCTAs++;
            result.details.push(`✓ ${section.name} section has CTA`);
          }
        }
      });

      if (sectionsWithCTAs >= 4) {
        result.details.push(`✓ CTAs present in ${sectionsWithCTAs}/${sections.length} key sections`);
      } else {
        result.warnings.push(`CTAs only in ${sectionsWithCTAs}/${sections.length} key sections`);
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 3: Verify CTA click functionality (proper links)
   */
  testCTAClickFunctionality(): TestResult {
    const result: TestResult = {
      testName: 'CTA Click Functionality',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check phone number format
      const phonePattern = /tel:\+918828709945/g;
      const phoneMatches = content.match(phonePattern);
      
      if (phoneMatches && phoneMatches.length > 0) {
        result.details.push(`✓ Phone links properly formatted (${phoneMatches.length} instances)`);
      } else {
        result.passed = false;
        result.details.push('✗ No properly formatted phone links found');
      }

      // Check WhatsApp link format
      const whatsappPattern = /https:\/\/wa\.me\/918828709945\?text=/g;
      const whatsappMatches = content.match(whatsappPattern);
      
      if (whatsappMatches && whatsappMatches.length > 0) {
        result.details.push(`✓ WhatsApp links properly formatted (${whatsappMatches.length} instances)`);
      } else {
        result.passed = false;
        result.details.push('✗ No properly formatted WhatsApp links found');
      }

      // Check for pre-filled WhatsApp messages
      const whatsappMessagePattern = /text=Hi.*service/g;
      const whatsappMessageMatches = content.match(whatsappMessagePattern);
      
      if (whatsappMessageMatches && whatsappMessageMatches.length > 0) {
        result.details.push('✓ WhatsApp links include pre-filled messages');
      } else {
        result.warnings.push('WhatsApp links may not have pre-filled messages');
      }

      // Check for target="_blank" on WhatsApp links
      const targetBlankPattern = /target="_blank"/g;
      const targetBlankMatches = content.match(targetBlankPattern);
      
      if (targetBlankMatches && targetBlankMatches.length > 0) {
        result.details.push('✓ External links open in new tab');
      }

      // Check for rel="noopener noreferrer" on external links
      const relPattern = /rel="noopener noreferrer"/g;
      const relMatches = content.match(relPattern);
      
      if (relMatches && relMatches.length > 0) {
        result.details.push('✓ External links have proper security attributes');
      }

      // Check for aria-label on icon-only buttons
      const ariaLabelPattern = /aria-label="/g;
      const ariaLabelMatches = content.match(ariaLabelPattern);
      
      if (ariaLabelMatches && ariaLabelMatches.length > 0) {
        result.details.push('✓ Accessibility attributes present');
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 4: Verify sticky mobile CTA functionality
   */
  testStickyMobileCTA(): TestResult {
    const result: TestResult = {
      testName: 'Sticky Mobile CTA',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Extract sticky mobile CTA section
      const stickyPattern = /{\/\* Sticky Mobile CTA[\s\S]*?<\/div>\s*<\/div>/;
      const stickyMatch = content.match(stickyPattern);
      
      if (!stickyMatch) {
        result.passed = false;
        result.details.push('✗ Sticky mobile CTA not found');
        return result;
      }

      const stickyCTA = stickyMatch[0];

      // Check for fixed positioning
      if (stickyCTA.includes('fixed bottom-0')) {
        result.details.push('✓ Sticky CTA has fixed positioning');
      } else {
        result.passed = false;
        result.details.push('✗ Sticky CTA missing fixed positioning');
      }

      // Check for mobile-only display
      if (stickyCTA.includes('md:hidden')) {
        result.details.push('✓ Sticky CTA is mobile-only');
      } else {
        result.warnings.push('Sticky CTA may display on desktop');
      }

      // Check for proper z-index
      if (stickyCTA.includes('z-40') || stickyCTA.includes('z-50')) {
        result.details.push('✓ Sticky CTA has proper z-index');
      }

      // Check for both call and WhatsApp options
      const hasCall = stickyCTA.includes('tel:');
      const hasWhatsApp = stickyCTA.includes('wa.me');
      
      if (hasCall && hasWhatsApp) {
        result.details.push('✓ Sticky CTA includes both call and WhatsApp options');
      } else {
        result.passed = false;
        result.details.push('✗ Sticky CTA missing call or WhatsApp option');
      }

      // Check for touch-friendly sizing
      if (stickyCTA.includes('min-h-[44px]')) {
        result.details.push('✓ Sticky CTA buttons are touch-friendly');
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 5: Verify contact options are present
   */
  testContactOptions(): TestResult {
    const result: TestResult = {
      testName: 'Contact Options Present',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check for phone number
      const phoneNumber = '+918828709945';
      if (content.includes(phoneNumber)) {
        result.details.push(`✓ Phone number present: ${phoneNumber}`);
      } else {
        result.passed = false;
        result.details.push('✗ Phone number not found');
      }

      // Check for WhatsApp number
      const whatsappNumber = '918828709945';
      if (content.includes(whatsappNumber)) {
        result.details.push(`✓ WhatsApp number present: ${whatsappNumber}`);
      } else {
        result.passed = false;
        result.details.push('✗ WhatsApp number not found');
      }

      // Check for StickyWhatsApp component
      if (content.includes('<StickyWhatsApp />')) {
        result.details.push('✓ StickyWhatsApp component included');
      } else {
        result.warnings.push('StickyWhatsApp component not found');
      }

      // Check for phone icon
      if (content.includes('<Phone')) {
        result.details.push('✓ Phone icon present');
      }

      // Check for WhatsApp/Message icon
      if (content.includes('<MessageCircle')) {
        result.details.push('✓ WhatsApp icon present');
      }

      // Count unique contact methods
      const contactMethods = [];
      if (content.includes('tel:')) contactMethods.push('Phone');
      if (content.includes('wa.me')) contactMethods.push('WhatsApp');
      
      result.details.push(`✓ ${contactMethods.length} contact methods available: ${contactMethods.join(', ')}`);

      if (contactMethods.length < 2) {
        result.warnings.push('Consider adding more contact methods');
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 6: Verify CTA button styling and visibility
   */
  testCTAStyling(): TestResult {
    const result: TestResult = {
      testName: 'CTA Styling and Visibility',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check for prominent colors
      const hasAmberButtons = content.includes('bg-amber-600');
      const hasGreenButtons = content.includes('bg-green-600');
      
      if (hasAmberButtons && hasGreenButtons) {
        result.details.push('✓ CTAs use prominent brand colors');
      }

      // Check for hover effects
      const hoverPattern = /hover:bg-(?:amber|green)-700/g;
      const hoverMatches = content.match(hoverPattern);
      
      if (hoverMatches && hoverMatches.length > 5) {
        result.details.push('✓ CTAs have hover effects');
      }

      // Check for shadow effects
      const shadowPattern = /shadow-(?:lg|xl|2xl)/g;
      const shadowMatches = content.match(shadowPattern);
      
      if (shadowMatches && shadowMatches.length > 5) {
        result.details.push('✓ CTAs have shadow effects for depth');
      }

      // Check for transition effects
      const transitionPattern = /transition-(?:all|colors)/g;
      const transitionMatches = content.match(transitionPattern);
      
      if (transitionMatches && transitionMatches.length > 5) {
        result.details.push('✓ CTAs have smooth transitions');
      }

      // Check for scale effects on hover
      const scalePattern = /hover:scale-105/g;
      const scaleMatches = content.match(scalePattern);
      
      if (scaleMatches && scaleMatches.length > 3) {
        result.details.push('✓ CTAs have scale effects on hover');
      }

      // Check for rounded corners
      const roundedPattern = /rounded-lg/g;
      const roundedMatches = content.match(roundedPattern);
      
      if (roundedMatches && roundedMatches.length > 10) {
        result.details.push('✓ CTAs have rounded corners');
      }

      // Check for font weight
      const fontWeightPattern = /font-semibold|font-bold/g;
      const fontWeightMatches = content.match(fontWeightPattern);
      
      if (fontWeightMatches && fontWeightMatches.length > 10) {
        result.details.push('✓ CTAs have bold text');
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 7: Verify contextual CTA messages
   */
  testContextualCTAMessages(): TestResult {
    const result: TestResult = {
      testName: 'Contextual CTA Messages',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check for dynamic service and location in WhatsApp messages
      const dynamicMessagePattern = /\$\{serviceName\}.*\$\{location\}/g;
      const dynamicMessageMatches = content.match(dynamicMessagePattern);
      
      if (dynamicMessageMatches && dynamicMessageMatches.length > 0) {
        result.details.push(`✓ WhatsApp messages include dynamic service and location (${dynamicMessageMatches.length} instances)`);
      } else {
        result.warnings.push('WhatsApp messages may not be contextual');
      }

      // Check for varied CTA text
      const ctaTexts = [
        'Call Now',
        'WhatsApp Us',
        'Book Service Now',
        'Get Free Quote',
        'Call for Exact Quote',
        'Ask a Question',
      ];

      let foundTexts = 0;
      ctaTexts.forEach(text => {
        if (content.includes(text)) {
          foundTexts++;
        }
      });

      result.details.push(`✓ Found ${foundTexts}/${ctaTexts.length} varied CTA texts`);

      if (foundTexts >= 4) {
        result.details.push('✓ Good variety of CTA messaging');
      } else {
        result.warnings.push('Consider adding more varied CTA text');
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Run all tests
   */
  runAllTests(): void {
    console.log('\n🧪 Running CTA and Booking Flow Tests...\n');
    console.log('='.repeat(60));

    const tests = [
      this.testCTAsAboveFold.bind(this),
      this.testCTAsThroughoutPage.bind(this),
      this.testCTAClickFunctionality.bind(this),
      this.testStickyMobileCTA.bind(this),
      this.testContactOptions.bind(this),
      this.testCTAStyling.bind(this),
      this.testContextualCTAMessages.bind(this),
    ];

    tests.forEach(test => {
      const result = test();
      this.report.results.push(result);
      this.report.totalTests++;

      if (result.passed) {
        this.report.passed++;
        console.log(`\n✅ ${result.testName}`);
      } else {
        this.report.failed++;
        console.log(`\n❌ ${result.testName}`);
      }

      result.details.forEach(detail => console.log(`   ${detail}`));
      
      if (result.warnings.length > 0) {
        this.report.warnings += result.warnings.length;
        result.warnings.forEach(warning => console.log(`   ⚠️  ${warning}`));
      }
    });

    this.printSummary();
  }

  /**
   * Print test summary
   */
  printSummary(): void {
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Test Summary\n');
    console.log(`Total Tests: ${this.report.totalTests}`);
    console.log(`✅ Passed: ${this.report.passed}`);
    console.log(`❌ Failed: ${this.report.failed}`);
    console.log(`⚠️  Warnings: ${this.report.warnings}`);
    
    const passRate = ((this.report.passed / this.report.totalTests) * 100).toFixed(1);
    console.log(`\nPass Rate: ${passRate}%`);

    if (this.report.failed === 0) {
      console.log('\n🎉 All CTA and booking flow tests passed!');
    } else {
      console.log('\n⚠️  Some tests failed. Please review the details above.');
    }

    console.log('\n' + '='.repeat(60) + '\n');
  }
}

// Run tests
const tester = new CTAAndBookingFlowTest();
tester.runAllTests();
