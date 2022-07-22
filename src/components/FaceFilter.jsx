import { useEffect } from "react";
import styled from "styled-components";
import { JEELIZFACEFILTER, NN_LIGHT } from "facefilter";
import * as THREE from "three";

import useStore from "../zustand/store";
import { JeelizResizer } from "../helpers/JeelizResizer";
import { JeelizThreeHelper } from "../helpers/JeelizThreeHelper";
import { noseEffect } from "../sound";

const noseSound = new Audio(noseEffect);

function FaceFilter() {
  const { lieCount, isDetected } = useStore();

  useEffect(() => {
    let THREECAMERA = null;

    function detectCallback(faceIndex, isDetected) {
      if (isDetected) {
        console.log("INFO in detectCallback(): DETECTED");
        useStore.setState({ isDetected: true });
      } else {
        console.log("INFO in detectCallback(): LOST");
        useStore.setState({ isDetected: false });
      }
    }

    function initThreeScene(spec) {
      const threeStuffs = JeelizThreeHelper.init(spec, detectCallback);

      const HATOBJ3D = new THREE.Object3D();
      const loader = new THREE.BufferGeometryLoader();

      loader.load("models/luffys_hat.json", (geometry) => {
        const mat = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load("models/Texture.jpg"),
        });
        const HAT_MESH = new THREE.Mesh(geometry, mat);

        HAT_MESH.scale.multiplyScalar(1.7);
        HAT_MESH.rotation.set(-0.1, -60, 0);
        HAT_MESH.position.set(0.0, 0.8, -1.7);
        HAT_MESH.frustumCulled = false;
        HAT_MESH.side = THREE.DoubleSide;

        const maskLoader = new THREE.BufferGeometryLoader();

        maskLoader.load(
          "models/faceLowPolyEyesEarsFill2.json",
          (maskBufferGeometry) => {
            const vertexShaderSource =
              "uniform mat2 videoTransformMat2;\n\
          varying vec2 vUVvideo;\n\
          varying float vY, vNormalDotZ;\n\
          const float THETAHEAD = 0.25;\n\
          \n\
          void main() {\n\
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0);\n\
            vec4 projectedPosition = projectionMatrix * mvPosition;\n\
            gl_Position = projectedPosition;\n\
            \n\
            // compute UV coordinates on the video texture:\n\
            vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n\
            vec4 projectedPosition0 = projectionMatrix * mvPosition0;\n\
            // flip the video on vertical axis:\n\
            vUVvideo = vec2(0.5, 0.5) + videoTransformMat2 * projectedPosition0.xy / projectedPosition0.w;\n\
            vY = position.y * cos(THETAHEAD)-position.z*sin(THETAHEAD);\n\
            vec3 normalView = vec3(modelViewMatrix * vec4(normal,0.));\n\
            vNormalDotZ = pow(abs(normalView.z), 1.5);\n\
          }";

            const fragmentShaderSource =
              "precision lowp float;\n\
          uniform sampler2D samplerVideo;\n\
          varying vec2 vUVvideo;\n\
          varying float vY, vNormalDotZ;\n\
          void main() {\n\
            vec3 videoColor = texture2D(samplerVideo, vUVvideo).rgb;\n\
            float darkenCoeff = smoothstep(-0.15, 0.15, vY);\n\
            float borderCoeff = smoothstep(0.0, 0.85, vNormalDotZ);\n\
            gl_FragColor = vec4(videoColor * (1.-darkenCoeff), borderCoeff );\n\
            // gl_FragColor=vec4(borderCoeff, 0., 0., 1.);\n\
            // gl_FragColor=vec4(darkenCoeff, 0., 0., 1.);\n\
          }";

            const mat = new THREE.ShaderMaterial({
              vertexShader: vertexShaderSource,
              fragmentShader: fragmentShaderSource,
              transparent: true,
              flatShading: false,
              uniforms: {
                samplerVideo: {
                  value: JeelizThreeHelper.get_threeVideoTexture(),
                },
                videoTransformMat2: { value: spec.videoTransformMat2 },
              },
            });
            maskBufferGeometry.computeVertexNormals();
            const FACE_MESH = new THREE.Mesh(maskBufferGeometry, mat);
            FACE_MESH.frustumCulled = false;
            FACE_MESH.scale.multiplyScalar(1.4);
            FACE_MESH.position.set(0, 0.5, -2.1);
            const noseTipGeom = new THREE.SphereGeometry(0.2, 30, 12);
            const material = new THREE.MeshPhongMaterial({
              shininess: 30,
              color: 0xff5233,
            });

            const noseTip = new THREE.Mesh(noseTipGeom, material);
            noseTip.position.set(0, 0.3 + 0.1 * lieCount, 0);
            const noseTipY = noseTip.position.y;

            const noseBodyGeom = new THREE.CylinderGeometry(
              0.2,
              0.22,
              noseTipY * 2,
              30,
            );

            noseTip.updateMatrix();
            noseBodyGeom.merge(noseTip.geometry, noseTip.matrix);

            const NOSE_MESH = new THREE.Mesh(noseBodyGeom, material);

            NOSE_MESH.rotation.x = 0.55 * Math.PI;
            NOSE_MESH.position.set(0, 0, -0.3);

            if (lieCount > 1) {
              NOSE_MESH.position.set(
                0,
                -0.01 * lieCount,
                -0.3 + 0.09 * lieCount,
              );
            }

            NOSE_MESH.frustumCulled = false;

            if (lieCount >= 3) {
              HATOBJ3D.add(HAT_MESH);
              HATOBJ3D.add(FACE_MESH);
            }
            HATOBJ3D.add(NOSE_MESH);

            threeStuffs.faceObject.add(HATOBJ3D);
            noseSound.play();
          },
        );
      });

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
        NNC: NN_LIGHT,
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

    if (0 < lieCount < 5) {
      JEELIZFACEFILTER.destroy();
    }
  }, [lieCount, isDetected]);

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
  width: 133.5vmin;
  height: 100vmin;
  transform: translate(-50%, -50%) rotateY(180deg);
  @media (max-width: 787px) {
    right: 0px;
    top: 60px;
    transform: rotateY(180deg);
  }
`;

export default FaceFilter;
