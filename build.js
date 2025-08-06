#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Building StringMovies for production...\n');

// 1. Build CSS
console.log('📦 Building CSS...');
const { execSync } = require('child_process');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ CSS built successfully\n');
} catch (error) {
  console.error('❌ CSS build failed:', error.message);
  process.exit(1);
}

// 2. Validate environment
console.log('🔍 Validating environment...');
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found. Copy .env.example to .env and configure your credentials.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const requiredVars = [
  'TMDB_API_KEY',
  'FIREBASE_API_KEY',
  'FIREBASE_PROJECT_ID'
];

const missingVars = requiredVars.filter(varName => 
  !envContent.includes(`${varName}=`) || envContent.includes(`${varName}=your_`)
);

if (missingVars.length > 0) {
  console.error('❌ Missing or placeholder environment variables:', missingVars.join(', '));
  console.error('Please configure these in your .env file.');
  process.exit(1);
}

console.log('✅ Environment validation passed\n');

// 3. Check file structure
console.log('📁 Checking file structure...');
const requiredFiles = [
  'public/index.html',
  'public/css/output.css',
  'src/js/config.js',
  'src/js/firebase.js',
  'src/components/nav.html',
  'src/components/footer.html'
];

const missingFiles = requiredFiles.filter(file => 
  !fs.existsSync(path.join(__dirname, file))
);

if (missingFiles.length > 0) {
  console.error('❌ Missing required files:', missingFiles.join(', '));
  process.exit(1);
}

console.log('✅ File structure validation passed\n');

// 4. Create deployment info
const deployInfo = {
  buildTime: new Date().toISOString(),
  version: require('./package.json').version,
  environment: 'production'
};

fs.writeFileSync(
  path.join(__dirname, 'public', 'build-info.json'),
  JSON.stringify(deployInfo, null, 2)
);

console.log('🎉 Build completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Test locally: npm run serve');
console.log('2. Deploy the public/ folder to your hosting platform');
console.log('3. Configure environment variables on your hosting platform');
console.log('4. Test the deployed application\n');

console.log('📁 Files ready for deployment in public/ folder');