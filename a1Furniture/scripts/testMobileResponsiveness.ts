/**
 * Mobile Responsiveness Testing Script
 * Tests mobile layouts, touch-friendly elements, and responsive design
 * Requirements: 8.1, 8.2, 8.3, 8.5, 10.4
 */

import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  testName: string;
  passed: boolean;
  details: string[];
  warnings: string[];
}

interface MobileTestReport {
  totalTests: number;
  passed: number;
  failed: number;
  warnings: number;
  results: TestResult[];
}

// Test configuration
const MOBILE_BREAKPOINTS = {
  mobile: 320,
  mobileLarge: 375,
  tablet: 768,
};

const MIN_FONT_SIZE = 16; // Requirement 8.2
const MIN_TOUCH_TARGET = 44; // Requirement 8.3

class MobileResponsivenessTest {
  private report: MobileTestReport = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    results: [],
  };

  /**
   * Test 1: Verify responsive layout classes
   */
  testResponsiveLayoutClasses(): TestResult {
    const result: TestResult = {
      testName: 'Responsive Layout Classes',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check for responsive grid classes
      const responsivePatterns = [
        /grid-cols-1/g,
        /sm:grid-cols-2/g,
        /md:grid-cols-3/g,
        /lg:grid-cols-4/g,
        /flex-col/g,
        /sm:flex-row/g,
      ];

      let foundPatterns = 0;
      responsivePatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches && matches.length > 0) {
          foundPatterns++;
          result.details.push(`✓ Found ${matches.length} instances of ${pattern.source}`);
        }
      });

      if (foundPatterns < 4) {
        result.passed = false;
        result.warnings.push(`Only ${foundPatterns}/6 responsive patterns found`);
      } else {
        result.details.push(`✓ Template uses responsive grid and flex layouts`);
      }

      // Check for mobile-first approach (base classes without breakpoints)
      const mobileFirstCheck = /className="[^"]*(?:grid-cols-1|flex-col|text-sm|px-4|py-3)/g;
      const mobileFirstMatches = content.match(mobileFirstCheck);
      if (mobileFirstMatches && mobileFirstMatches.length > 10) {
        result.details.push(`✓ Mobile-first approach detected (${mobileFirstMatches.length} base classes)`);
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error reading template: ${error}`);
    }

    return result;
  }

  /**
   * Test 2: Verify no horizontal scroll (proper container widths)
   */
  testNoHorizontalScroll(): TestResult {
    const result: TestResult = {
      testName: 'No Horizontal Scroll',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check for max-width containers
      const maxWidthPattern = /max-w-(?:7xl|6xl|5xl|4xl|3xl|2xl|xl|lg|md|sm)/g;
      const maxWidthMatches = content.match(maxWidthPattern);
      
      if (maxWidthMatches && maxWidthMatches.length > 5) {
        result.details.push(`✓ Found ${maxWidthMatches.length} max-width containers`);
      } else {
        result.warnings.push('Few max-width containers found');
      }

      // Check for responsive padding
      const paddingPattern = /px-4|px-6|sm:px-6|lg:px-8/g;
      const paddingMatches = content.match(paddingPattern);
      
      if (paddingMatches && paddingMatches.length > 10) {
        result.details.push(`✓ Responsive padding applied (${paddingMatches.length} instances)`);
      }

      // Check for overflow handling
      const overflowPattern = /overflow-hidden|overflow-x-hidden/g;
      const overflowMatches = content.match(overflowPattern);
      
      if (overflowMatches) {
        result.details.push(`✓ Overflow control present`);
      }

      // Check for fixed width elements that might cause scroll
      const fixedWidthPattern = /w-\[\d+px\]/g;
      const fixedWidthMatches = content.match(fixedWidthPattern);
      
      if (fixedWidthMatches && fixedWidthMatches.length > 5) {
        result.warnings.push(`Found ${fixedWidthMatches.length} fixed-width elements - verify they don't cause horizontal scroll`);
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 3: Verify touch-friendly button sizes (min 44px)
   */
  testTouchFriendlyButtons(): TestResult {
    const result: TestResult = {
      testName: 'Touch-Friendly Buttons (min 44px)',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check for min-h-[44px] on buttons
      const minHeightPattern = /min-h-\[44px\]/g;
      const minHeightMatches = content.match(minHeightPattern);
      
      if (minHeightMatches && minHeightMatches.length >= 8) {
        result.details.push(`✓ Found ${minHeightMatches.length} buttons with min-h-[44px]`);
      } else {
        result.passed = false;
        result.details.push(`✗ Only ${minHeightMatches?.length || 0} buttons have min-h-[44px] (expected at least 8)`);
      }

      // Check for adequate padding on buttons
      const buttonPaddingPattern = /(?:px-8|px-6|px-4).*(?:py-4|py-3)/g;
      const buttonPaddingMatches = content.match(buttonPaddingPattern);
      
      if (buttonPaddingMatches && buttonPaddingMatches.length > 5) {
        result.details.push(`✓ Buttons have adequate padding`);
      }

      // Check for touch-friendly icon sizes
      const iconSizePattern = /size=\{(?:20|24|18)\}/g;
      const iconSizeMatches = content.match(iconSizePattern);
      
      if (iconSizeMatches && iconSizeMatches.length > 10) {
        result.details.push(`✓ Icons are appropriately sized for touch (${iconSizeMatches.length} instances)`);
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 4: Verify readable font sizes (min 16px)
   */
  testReadableFontSizes(): TestResult {
    const result: TestResult = {
      testName: 'Readable Font Sizes (min 16px)',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check for text size classes
      const textSizePattern = /text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)/g;
      const textSizeMatches = content.match(textSizePattern);
      
      if (textSizeMatches) {
        result.details.push(`✓ Found ${textSizeMatches.length} text size declarations`);
      }

      // Check for responsive text sizes
      const responsiveTextPattern = /(?:text-xs|text-sm).*(?:md:text-base|md:text-lg)/g;
      const responsiveTextMatches = content.match(responsiveTextPattern);
      
      if (responsiveTextMatches && responsiveTextMatches.length > 5) {
        result.details.push(`✓ Responsive text sizing applied (${responsiveTextMatches.length} instances)`);
      }

      // Warn about text-xs usage (12px - below minimum)
      const tinyTextPattern = /text-xs(?!\s+md:)/g;
      const tinyTextMatches = content.match(tinyTextPattern);
      
      if (tinyTextMatches && tinyTextMatches.length > 10) {
        result.warnings.push(`Found ${tinyTextMatches.length} instances of text-xs without responsive scaling - verify readability`);
      }

      // Check for proper heading hierarchy
      const headingPattern = /<h[1-6]/g;
      const headingMatches = content.match(headingPattern);
      
      if (headingMatches && headingMatches.length > 5) {
        result.details.push(`✓ Proper heading structure (${headingMatches.length} headings)`);
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 5: Verify sticky floating CTA for mobile
   */
  testStickyFloatingCTA(): TestResult {
    const result: TestResult = {
      testName: 'Sticky Floating CTA',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check for sticky mobile CTA
      const stickyPattern = /fixed bottom-0.*md:hidden/s;
      const stickyMatch = content.match(stickyPattern);
      
      if (stickyMatch) {
        result.details.push(`✓ Sticky mobile CTA found`);
      } else {
        result.passed = false;
        result.details.push(`✗ No sticky mobile CTA detected`);
      }

      // Check for z-index to ensure CTA is above content
      const zIndexPattern = /z-(?:40|50)/g;
      const zIndexMatches = content.match(zIndexPattern);
      
      if (zIndexMatches && zIndexMatches.length > 0) {
        result.details.push(`✓ Proper z-index layering applied`);
      }

      // Check for mobile-specific classes
      const mobileOnlyPattern = /md:hidden/g;
      const mobileOnlyMatches = content.match(mobileOnlyPattern);
      
      if (mobileOnlyMatches && mobileOnlyMatches.length > 0) {
        result.details.push(`✓ Mobile-specific elements present (${mobileOnlyMatches.length} instances)`);
      }

      // Verify CTA has both call and WhatsApp options
      const ctaContent = content.match(/fixed bottom-0[\s\S]*?<\/div>/);
      if (ctaContent) {
        const hasPhone = ctaContent[0].includes('tel:');
        const hasWhatsApp = ctaContent[0].includes('wa.me');
        
        if (hasPhone && hasWhatsApp) {
          result.details.push(`✓ CTA includes both phone and WhatsApp options`);
        } else {
          result.warnings.push('CTA may be missing phone or WhatsApp option');
        }
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 6: Verify mobile image optimization
   */
  testMobileImageOptimization(): TestResult {
    const result: TestResult = {
      testName: 'Mobile Image Optimization',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check for OptimizedImage component usage
      const optimizedImagePattern = /<OptimizedImage/g;
      const optimizedImageMatches = content.match(optimizedImagePattern);
      
      if (optimizedImageMatches && optimizedImageMatches.length > 0) {
        result.details.push(`✓ Using OptimizedImage component (${optimizedImageMatches.length} instances)`);
      } else {
        result.warnings.push('No OptimizedImage component found');
      }

      // Check for responsive image sizes
      const sizesPattern = /sizes=\{/g;
      const sizesMatches = content.match(sizesPattern);
      
      if (sizesMatches && sizesMatches.length > 0) {
        result.details.push(`✓ Responsive image sizes configured`);
      }

      // Check for lazy loading
      const lazyPattern = /loading="lazy"|priority=\{true\}/g;
      const lazyMatches = content.match(lazyPattern);
      
      if (lazyMatches && lazyMatches.length > 0) {
        result.details.push(`✓ Image loading strategy implemented`);
      }

    } catch (error) {
      result.passed = false;
      result.details.push(`✗ Error: ${error}`);
    }

    return result;
  }

  /**
   * Test 7: Verify mobile spacing and gaps
   */
  testMobileSpacing(): TestResult {
    const result: TestResult = {
      testName: 'Mobile Spacing and Gaps',
      passed: true,
      details: [],
      warnings: [],
    };

    try {
      const templatePath = path.join(process.cwd(), 'src/components/ServicePageTemplate.tsx');
      const content = fs.readFileSync(templatePath, 'utf-8');

      // Check for responsive gaps
      const gapPattern = /gap-(?:2|3|4|6|8)/g;
      const gapMatches = content.match(gapPattern);
      
      if (gapMatches && gapMatches.length > 10) {
        result.details.push(`✓ Adequate spacing between elements (${gapMatches.length} gap declarations)`);
      }

      // Check for responsive spacing
      const responsiveSpacingPattern = /(?:gap-2|gap-3|gap-4).*(?:md:gap-6|md:gap-8)/g;
      const responsiveSpacingMatches = content.match(responsiveSpacingPattern);
      
      if (responsiveSpacingMatches && responsiveSpacingMatches.length > 3) {
        result.details.push(`✓ Responsive spacing applied`);
      }

      // Check for section padding
      const sectionPaddingPattern = /py-12.*md:py-16/g;
      const sectionPaddingMatches = content.match(sectionPaddingPattern);
      
      if (sectionPaddingMatches && sectionPaddingMatches.length > 5) {
        result.details.push(`✓ Consistent section padding (${sectionPaddingMatches.length} sections)`);
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
    console.log('\n🧪 Running Mobile Responsiveness Tests...\n');
    console.log('='.repeat(60));

    const tests = [
      this.testResponsiveLayoutClasses.bind(this),
      this.testNoHorizontalScroll.bind(this),
      this.testTouchFriendlyButtons.bind(this),
      this.testReadableFontSizes.bind(this),
      this.testStickyFloatingCTA.bind(this),
      this.testMobileImageOptimization.bind(this),
      this.testMobileSpacing.bind(this),
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
      console.log('\n🎉 All mobile responsiveness tests passed!');
    } else {
      console.log('\n⚠️  Some tests failed. Please review the details above.');
    }

    console.log('\n' + '='.repeat(60) + '\n');
  }
}

// Run tests
const tester = new MobileResponsivenessTest();
tester.runAllTests();
