import { useEffect } from "react";
import styled from "styled-components";
import { JEELIZFACEFILTER, NN_DEFAULT } from "facefilter";
import * as THREE from "three";
import { JeelizResizer } from "../helpers/JeelizResizer";
import { JeelizThreeHelper } from "../helpers/JeelizThreeHelper";

function FaceFilter() {
  let THREECAMERA = null;

  // callback: launched if a face is detected or lost.
  function detectCallback(faceIndex, isDetected) {
    if (isDetected) {
      console.log("INFO in detectCallback(): DETECTED");
    } else {
      console.log("INFO in detectCallback(): LOST");
    }
  }

  // build the 3D. called once when Jeeliz Face Filter is OK
  function initThreeScene(spec) {
    const threeStuffs = JeelizThreeHelper.init(spec, detectCallback);

    const noseTipGeom = new THREE.SphereGeometry(0.2, 30, 12);
    const material = new THREE.MeshPhongMaterial({
      shininess: 30,
      wireframe: false,
      flatShading: false,
      color: 0xff5233,
    });
    const noseTip = new THREE.Mesh(noseTipGeom, material);
    const noseTipY = (noseTip.position.y = 0.3);

    const noseBodyGeom = new THREE.CylinderGeometry(
      0.2,
      0.22,
      noseTipY * 2,
      30,
    );
    noseTip.updateMatrix();
    noseBodyGeom.merge(noseTip.geometry, noseTip.matrix);

    const nose = new THREE.Mesh(noseBodyGeom, material);
    nose.rotation.x = 0.55 * Math.PI;
    nose.position.z = -0.3;

    nose.frustumCulled = false;
    threeStuffs.faceObject.add(nose);

    //CREATE THE CAMERA
    THREECAMERA = JeelizThreeHelper.create_camera();
  }

  // entry point:
  function main() {
    JeelizResizer.size_canvas({
      canvasId: "jeeFaceFilterCanvas",
      callback: function (isError, bestVideoSettings) {
        initFaceFilter(bestVideoSettings);
      },
    });
  }

  function initFaceFilter() {
    JEELIZFACEFILTER.init({
      followZRot: true,
      canvasId: "jeeFaceFilterCanvas",
      NNC: NN_DEFAULT,
      maxFacesDetected: 1,
      callbackReady: function (errCode, spec) {
        if (errCode) {
          console.log("AN ERROR HAPPENS. ERR =", errCode);
          return;
        }

        console.log("INFO: JEELIZFACEFILTER IS READY");
        initThreeScene(spec);
      },

      // called at each render iteration (drawing loop):
      callbackTrack: function (detectState) {
        JeelizThreeHelper.render(detectState, THREECAMERA);
      },
    }); //end JEELIZFACEFILTER.init call
  }

  useEffect(() => {
    main();
    window.addEventListener("load", main);
  }, []);

  return (
    <div className="video-canvas">
      <Canvas width="600" height="600" id="jeeFaceFilterCanvas"></Canvas>
    </div>
  );
}

const Canvas = styled.canvas`
  z-index: 10;
  position: absolute;
  max-height: 100%;
  max-width: 100%;
  left: 50%;
  top: 50%;
  width: 100vmin;
  transform: translate(-50%, -50%) rotateY(180deg);

  @media (max-width: 787px) {
    right: 0px;
    top: 60px;
    transform: rotateY(180deg);
  }
`;

export default FaceFilter;
