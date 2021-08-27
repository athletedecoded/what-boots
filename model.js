const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

const imageClassification = async path => {
    const image = tfnode.node.decodeImage(path);
    const model = await tf.loadLayersModel('https://drive.google.com/drive/folders/1MpQzeFNB-QyPyszMczDEOPOq2cyQAkZg?usp=sharing');
    const prediction = model.predict(image);
    console.log('Classification Results:', prediction);
}

imageClassification()
