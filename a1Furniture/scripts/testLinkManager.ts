// Test script for Link Manager
import { demonstrateLinkManager } from '../src/seo/examples/linkManagerExample';

async function runTest() {
  try {
    await demonstrateLinkManager();
  } catch (error) {
    console.error('Error running Link Manager demonstration:', error);
  }
}

runTest();