// download.js

import axios from 'axios';
import fs from 'fs';

async function downloadFile() {
  try {
    const cid = 'bafybeieglzgk7mixq2k4xvmx2yo227yzih4wu3xh6obtgasplyadpfenjy';
    const fileName = 'point_cloud.ply';
    const metadataName = "point_cloud.ply_metadata.json";
    const fileGatewayUrl = `https://${cid}.ipfs.w3s.link/${fileName}`;
    const metadataGatewayUrl = `https://${cid}.ipfs.w3s.link/${metadataName}`;

    // Download PLY file
    const fileResponse = await axios({
      method: 'GET',
      url: fileGatewayUrl,
      responseType: 'stream',
    });

    const fileWriter = fs.createWriteStream(fileName);
    fileResponse.data.pipe(fileWriter);

    await new Promise((resolve, reject) => {
      fileWriter.on('finish', resolve);
      fileWriter.on('error', reject);
    });

    console.log(`File ${fileName} downloaded successfully!`);

    // Download metadata file
    const metadataResponse = await axios({
      method: 'GET',
      url: metadataGatewayUrl,
      responseType: 'stream',
    });

    const metadataWriter = fs.createWriteStream(metadataName);
    metadataResponse.data.pipe(metadataWriter);

    await new Promise((resolve, reject) => {
      metadataWriter.on('finish', resolve);
      metadataWriter.on('error', reject);
    });

    console.log(`File ${metadataName} downloaded successfully!`);

  } catch (error) {
    console.error('Error downloading the files:', error);
  }
}

downloadFile();
