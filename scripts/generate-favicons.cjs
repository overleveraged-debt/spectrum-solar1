const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico').default || require('png-to-ico');

async function generate() {
  const srcImage = path.join(__dirname, '../public/images/fevicon.png');
  const publicDir = path.join(__dirname, '../public');

  if (!fs.existsSync(srcImage)) {
    console.error('Source image not found at', srcImage);
    process.exit(1);
  }

  console.log('Generating favicons from:', srcImage);

  const targets = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'favicon.png', size: 32 },
  ];

  for (const target of targets) {
    const outPath = path.join(publicDir, target.name);
    await sharp(srcImage)
      .resize(target.size, target.size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outPath);
    console.log(`✓ Created ${target.name} (${target.size}x${target.size})`);
  }

  // Generate multi-size favicon.ico (16, 32, 48)
  try {
    const icoBuffer = await pngToIco([
      path.join(publicDir, 'favicon-16x16.png'),
      path.join(publicDir, 'favicon-32x32.png'),
      path.join(publicDir, 'favicon-48x48.png'),
    ]);
    const icoPath = path.join(publicDir, 'favicon.ico');
    fs.writeFileSync(icoPath, icoBuffer);
    console.log('✓ Created favicon.ico (16x16, 32x32, 48x48)');
  } catch (err) {
    console.error('Failed generating favicon.ico with pngToIco, falling back to sharp ICO conversion:', err);
  }

  // Create site.webmanifest
  const manifest = {
    name: "Spectrum Solar",
    short_name: "Spectrum Solar",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#09090b",
    background_color: "#09090b",
    display: "standalone"
  };

  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('✓ Created site.webmanifest');
  console.log('All favicons generated successfully!');
}

generate().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
