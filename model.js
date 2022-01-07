require('dotenv').config();

const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

const CLF_URL='https://raw.githubusercontent.com/athletedecoded/what-boots/master/tfjs/model.json'

const LABELS = ["Adidas Copa",
                "Adidas Predator Mutator-Freak",
                "Adidas Predator 19",
                "Nike Mercurial Superfly",
                "Nike Tiempo Legend"]

const loadImage = (path) => {
  const imageBuffer = fs.readFileSync(path);
  let image = tfnode.node.decodeImage(imageBuffer,3);
  image = image.cast('float32').div(255); //Normalise
  image = tf.image.resizeBilinear(image, size = [224, 224]); // tf.image.resizeNearestNeighbor
  image = image.expandDims(); // Add Tensor dimension
  return image;
};

const getTopPreds = (predsArray) => {
    // Get top 3 predictions and labels
    var n = 3;
    var labels=LABELS;

    let sortedPreds = predsArray.slice().sort().reverse();
    let topPreds = {};
    if (labels.length == predsArray.length) {
        for (var i=0; i<n; i++) {
            j = predsArray.indexOf(sortedPreds[i]);
            topPreds[i+1] = {
                "label": labels[j],
                "prob": predsArray[j]
            };
        };
    }
    else {
        console.log("Mismatched arrays");
    };
    return topPreds;
};

const imageClassification = async (path) => {
    const image = loadImage(path);
    console.log("Image processed to tensor");
    console.log("Loading model...");
    const model = await tf.loadLayersModel(CLF_URL);
    var predsArray = await model.predict(image).data();
    // console.log(predsArray);
    var topPreds = getTopPreds(predsArray);
    console.log(topPreds);
    
    return topPreds;
};

module.exports = {
    imageClassification
};
