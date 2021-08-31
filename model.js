require('dotenv').config();

const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

const labels = ["Adidas Predator 19","Adidas Predator 20/21", "Nike Tiempo"]

const loadImage = (path) => {
  const imageBuffer = fs.readFileSync(path);
  let image = tfnode.node.decodeImage(imageBuffer,3);
  image = image.cast('float32').div(255); //Normalise
  image = tf.image.resizeBilinear(image, size = [224, 224]); // tf.image.resizeNearestNeighbor
  image = image.expandDims(); // Add Tensor dimension
  return image;
}

const imageClassification = async (path) => {
    const image = loadImage(path);
    console.log("Image processed", image)
    const model = await tf.loadLayersModel(process.env.CLF_URL);
    console.log("Model loaded", model.summary())
    const predsArray = await model.predict(image).data();
    return predsArray;
}

const predLabels = (labels, predsArray) => {
    let predictions = {}
    
}

module.exports = {
    imageClassification
}