import { useEffect } from "react";
import styled from "styled-components";
import { JEELIZFACEFILTER, NN_DEFAULT } from "facefilter";
import * as THREE from "three";

import useStore from "../zustand/store";
import { JeelizResizer } from "../helpers/JeelizResizer";
import { JeelizThreeHelper } from "../helpers/JeelizThreeHelper";

function FaceFilter() {
  const { questionCount } = useStore();

  useEffect(() => {
    let THREECAMERA = null;

    function detectCallback(faceIndex, isDetected) {
      if (isDetected) {
        console.log("INFO in detectCallback(): DETECTED");
      } else {
        console.log("INFO in detectCallback(): LOST");
      }
    }

    function initThreeScene(spec) {
      const threeStuffs = JeelizThreeHelper.init(spec, detectCallback);

      const noseTipGeom = new THREE.SphereGeometry(0.2, 30, 12);
      const material = new THREE.MeshPhongMaterial({
        shininess: 30,
        color: 0xff5233,
      });

      const noseTip = new THREE.Mesh(noseTipGeom, material);
      noseTip.position.set(0, 0.3 + 0.1 * questionCount, 0);
      const noseTipY = noseTip.position.y;

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
      nose.position.set(0, 0, -0.3);

      if (questionCount > 1) {
        nose.position.set(
          0,
          -0.01 * questionCount,
          -0.3 + 0.09 * questionCount,
        );
      }

      nose.frustumCulled = false;
      threeStuffs.faceObject.add(nose);

      THREECAMERA = JeelizThreeHelper.create_camera();
    }

    function main() {
      JeelizResizer.size_canvas({
        canvasId: "jeeFaceFilterCanvas",
        callback: (isError, bestVideoSettings) => {
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
        callbackReady: (errCode, spec) => {
          if (errCode) {
            console.log("AN ERROR HAPPENS. ERR =", errCode);
            return;
          }

          console.log("INFO: JEELIZFACEFILTER IS READY");
          initThreeScene(spec);
        },

        callbackTrack: (detectState) => {
          JeelizThreeHelper.render(detectState, THREECAMERA);
        },
      });
    }

    main();

    if (0 < questionCount < 8) {
      JEELIZFACEFILTER.destroy();
    }
  }, [questionCount]);

  return (
    <div className="video-canvas">
      <Canvas width="600" height="600" id="jeeFaceFilterCanvas"></Canvas>
    </div>
  );
}

const Canvas = styled.canvas`
  z-index: 10;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 132vmin;
  height: 100vmin;
  transform: translate(-50%, -50%) rotateY(180deg);
  @media (max-width: 787px) {
    right: 0px;
    top: 60px;
    transform: rotateY(180deg);
  }
`;

export default FaceFilter;
