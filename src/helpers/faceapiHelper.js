import * as faceapi from "face-api.js";

export const loadModels = async () => {
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");
  } catch (error) {
    console.log("HeadDetection loadModels Error INFO: ", error);
  }
};

export const detectFaces = async (video) => {
  if (!video) {
    return;
  }

  const videoSize = video.getBoundingClientRect();
  const displaySize = { width: videoSize.width, height: videoSize.height };
  if (displaySize.height === 0) {
    return;
  }

  const faces = await faceapi
    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks();

  return faceapi.resizeResults(faces, displaySize);
};

export const drawFaces = async (video, canvas, results, type) => {
  if (video && canvas && results) {
    const imgSize = video.getBoundingClientRect();
    const displaySize = { width: imgSize.width, height: imgSize.height };
    const resizedDetections = faceapi.resizeResults(results, displaySize);

    faceapi.matchDimensions(canvas, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    switch (type) {
      case "landmarks":
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        break;
      case "expressions":
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        break;
      case "box":
        faceapi.draw.drawDetections(canvas, resizedDetections);
        break;
      case "boxLandmarks":
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        break;
      default:
        break;
    }

    const face = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true);

    const x1 = face.landmarks._positions[0]._x;
    const y1 = face.landmarks._positions[0]._y;
    const x2 = face.landmarks._positions[16]._x;
    const y2 = face.landmarks._positions[16]._y;

    const _m = (y2 - y1) / (x2 - x1);
    const rad = Math.atan(_m);
    const angle = rad * (180 / 3.14) * -1;

    let lean = "FRONT";

    // 머리를 기울이는 특징 포착
    if (angle < -30) {
      lean = "LEFT";
    }

    if (angle > 30) {
      lean = "RIGHT";
    }

    return {
      HEAD_LEAN: lean,
    };
  }
};
