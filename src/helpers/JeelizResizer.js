/*eslint-disable*/
"use strict";

import { JEELIZFACEFILTER } from "facefilter";

export const JeelizResizer = (() => {
  let _domCanvas = null,
      _whCanvasPx = null,
      _isApplyCSS = false,
      _resizeAttemptsCounter = 0,
      _overSamplingFactor = 1,
      _isFullScreen = false,
      _timerFullScreen = null,
      _callbackResize = null,
      _isInvFullscreenWH = false;

  const _cameraResolutions = [
    [640,480],
    [768,480],
    [800,600],
    [960,640],
    [960,720],
    [1024,768],
    [1280,720],
    [1920, 1080]
  ];
  
  function add_CSStransform(domElement, CSS){
    const CSStransform = domElement.style.transform;
    if (CSStransform.indexOf(CSS) !== -1) return;
    domElement.style.transform = CSS + " " + CSStransform;
  }

  function compute_overlap(whA, whB){ 
    const aspectRatioA = whA[0] / whA[1];
    const aspectRatioB = whB[0] / whB[1]; 
    
    var whLandscape, whPortrait;
    if (aspectRatioA > aspectRatioB){ 
      whLandscape = whA, whPortrait = whB;
    } else {
      whLandscape = whB, whPortrait = whA;
    }

    const areaOverlap = Math.min(whLandscape[0], whPortrait[0]) * Math.min(whLandscape[1], whPortrait[1]);
    
    var areaTotal;
    if (whLandscape[0]>=whPortrait[0] && whLandscape[1]>=whPortrait[1]){
      areaTotal = whLandscape[0]*whLandscape[1];
    } else if (whPortrait[0]>whLandscape[0] && whPortrait[1]>whLandscape[1]){
      areaTotal = whPortrait[0]*whPortrait[1];
    } else {
      areaTotal = whLandscape[0]*whLandscape[1];
      areaTotal += (whPortrait[1]-whLandscape[1])*whPortrait[0];
    }

    return areaOverlap / areaTotal;
  }

  function update_sizeCanvas(){
    const domRect = _domCanvas.getBoundingClientRect();
    apply_sizeCanvas(domRect.width, domRect.height);
  }

  function apply_sizeCanvas(width, height){
    _whCanvasPx = [
      Math.round(_overSamplingFactor * width),
      Math.round(_overSamplingFactor * height)
    ];

    _domCanvas.setAttribute("width",  _whCanvasPx[0]);
    _domCanvas.setAttribute("height", _whCanvasPx[1]);

    if (_isApplyCSS){
      _domCanvas.style.width = width.toString() + "px";
      _domCanvas.style.height = height.toString() + "px";
    }
  }

  function on_windowResize(){
    if (_timerFullScreen){
      clearTimeout(_timerFullScreen);
    }
    _timerFullScreen = setTimeout(resize_fullScreen, 50);
  }

  function resize_canvasToFullScreen(){
    const wh = [window["innerWidth"], window["innerHeight"]];
    if (_isInvFullscreenWH){
      wh.reverse();
    }
    apply_sizeCanvas(wh[0], wh[1]);
  }

  function resize_fullScreen(){
    resize_canvasToFullScreen();
    JEELIZFACEFILTER.resize();
    _timerFullScreen = null;
    if (_callbackResize) {
      _callbackResize();
    }
  }

  const that = {
    is_portrait: () => {
      try{
        if (window["matchMedia"]("(orientation: portrait)")["matches"]){
          return true;
        } else {
          return false;
        }
      } catch(e){
        return (window["innerHeight"] > window["innerWidth"]);
      }
    },

    check_isIOS: () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator["userAgent"]) && !window["MSStream"];
      return isIOS;
    },

    get_IOSVersion: () => { 
      const v = (navigator["appVersion"]).match(/OS (\d+)_(\d+)_?(\d+)?/);
      return (v.length > 2) ? [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)] : [0, 0, 0];
    },

    check_isAndroid: () => {
      const ua = navigator["userAgent"].toLowerCase();
      return (ua.indexOf("android") !== -1);
    },

    get_androidVersion: () => {
      const ua = navigator["userAgent"].toLowerCase(); 
      const match = ua.match(/android\s([0-9\.]*)/i);
      if (!match || match.length<2){
        return [0,0,0];
      }
      const v = match[1].split(".");
      return [
        parseInt(v[0], 10),
        parseInt(v[1], 10),
        parseInt(v[2] || 0, 10)
      ];
    },

    require_flipVideoWHIfPortrait: () => {
      return false;
    },

    size_canvas: (optionsArg) => {
      const options = Object.assign({
        canvasId: "undefinedCanvasId",
        canvas: null,
        overSamplingFactor: window.devicePixelRatio || 1,

        isFullScreen: false,
        isInvWH: false,
        CSSFlipX: false,
        isApplyCSS: false,
        
        onResize: null,
        callback: () => {}
      }, optionsArg);

      _domCanvas = (options.canvas) ? options.canvas : document.getElementById(options.canvasId);
      _isFullScreen = options.isFullScreen;
      _isInvFullscreenWH = options.isInvWH;
      _isApplyCSS = options.isApplyCSS;
      _overSamplingFactor = options.overSamplingFactor;

      if (_isFullScreen){
        _callbackResize = options.onResize;
        
        resize_canvasToFullScreen();
        window.addEventListener("resize", on_windowResize, false);
        window.addEventListener("orientationchange", on_windowResize, false);
        
      } else {

        const domRect = _domCanvas.getBoundingClientRect();
        if (domRect.width===0 || domRect.height===0){
          console.log("WARNING in JeelizResize.size_canvas(): the canvas has its width or its height null, Retry a bit later...");
          if (++_resizeAttemptsCounter > 20){
            options.callback("CANNOT_RESIZECANVAS");
            return;
          }
          setTimeout(that.size_canvas.bind(null, options), 50);
          return;
        }

        _resizeAttemptsCounter = 0;        
        update_sizeCanvas();
      }

      if (options.CSSFlipX){
        add_CSStransform(_domCanvas, "rotateY(180deg)");
      }

      const allResolutions = _cameraResolutions.map((x) => {
        return x.slice(0)
      });
      
      if (that.is_portrait() && that.require_flipVideoWHIfPortrait()){
        allResolutions.forEach((wh) => {
          wh.reverse();
        });
      }

      allResolutions.sort((resA, resB) => {
        return compute_overlap(resB, _whCanvasPx) - compute_overlap(resA, _whCanvasPx);        
      });

      const bestCameraResolution = {
        "idealWidth":  allResolutions[0][0],
        "idealHeight": allResolutions[0][1]
      };

      console.log("INFO in JeelizResizer: bestCameraResolution =", bestCameraResolution);

      setTimeout(options.callback.bind(null, false, bestCameraResolution), 1);
    },

    resize_canvas: () => {
      if (_isFullScreen){
        resize_canvasToFullScreen()        
      } else {
        update_sizeCanvas();
      }
    },

    get_canvasSize: () => {
      return _whCanvasPx;
    }
  };
  return that;
})();

try {
  module.exports = JeelizResizer;
} catch(e){
  console.log("JeelizResizer ES6 Module not exported");
  window.JeelizResizer = JeelizResizer;
}