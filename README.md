# 🥕 Pinocchio

[배포 주소](https://dev--boisterous-gelato-6a156d.netlify.app/)

# 💬 **프로젝트 설명**

> 사용자가 질문응답 과정 중에 얼굴인식으로 거짓말 특징이 포착되면 3D 코가 길어지는 웹 어플리케이션

# 🤔 **프로젝트 동기**

> 보통의 거짓말 탐지기는 신체에 부착하는 장치를 가지고 거짓말 여부를 판별합니다. 문득, “꼭 부착장치가 있어야 거짓말을 판별할 수 있을까?” 라는 의문이 생겼습니다. 이 의문을 시작으로 부착장치 없이 웹의 기능만으로 거짓말 특징을 포착하고자 프로젝트를 시작하게 되었습니다.
>
> 일반적인 사람들이 거짓말을 할 때 나타나는 특징들이 있습니다. 특정 신체 부위(머리, 얼굴, 몸 등) 별로 다양하게 나타나는데, 이 프로젝트에서는 머리, 얼굴의 거짓말 특징에 포커스를 맞췄습니다. 그리고 질문을 화면에 띄우고 사용자가 질문에 응답하는 과정에서 웹의 얼굴인식 기능으로 거짓말 특징들이 포착 되었을 때, 마치 피노키오처럼 3D 코를 그려주고 길어지게 할 수 있다면 신선하고 재밌는 웹 어플리케이션이 될 수 있겠다고 생각했습니다.

# 📅  작업기간 | 22 . 06 . 27 ~ 22 . 07 . 17 (3주간)

### [ 1주차 ] 아이디어 기획 및 구체화 (6 . 27 ~ 7 . 3)

[개인 프로젝트 아이디어](https://www.notion.so/bef3cab673d64ba7886ddd4f8ddd5754)

[아이디어 디테일](https://www.notion.so/85d92b3a63bf42d286bb956aa5494d0a)

[거짓말쟁이를 찾아내는 11가지 간단한 방법](https://www.notion.so/11-8b79d516e47b40cca163c54e628853c3)

[Mock-up](https://www.notion.so/Mock-up-cf04f6c86f524c2fa5186d057250dfef)

[KANBAN](https://www.notion.so/a2d979f23c9f488db8d0a69b98520e91)

### [ 2주차 ] 개발 (7 . 4 ~ 7 . 10)

- **Setup** (prettier, eslint, github, install library)
- **Home 컴포넌트 작업**
- **Main 컴포넌트 작업** (webcam, 질문리스트, 카운트다운, 진행상태, 얼굴인식)
- **AnalysisResult 컴포넌트 작업**
- **AnalysisScreenshot 컴포넌트 작업**
- **FaceFilter & Three.js 적용**
- **Loading 작업**
- **Modal 작업**
- **NotFound 작업**

### [ 3주차 ] 개발 마무리 & 배포 및 리팩토링 (7 . 11 ~ 7 . 17)

- **Netlify 배포**
- **리팩토링**
- **테스트 코드 작성**

# 🌈 기술 스택

- **ES6+**
- **React**
- **Styled Component**
- **Tensorflow**
- **Facefilter**
- **Three.js**
- **Zustand**
- **Jest**

# ⭐️ 주요 기능

## 얼굴인식으로 거짓말 특징 포착하기 (Tensorflow + Faceapi.js)

- **머리 기울이기** (Leaning)
  질문에 응답하는 과정 중 한쪽으로 머리를 1초간 기울일 경우 거짓말로 간주
- **고개 돌리기** (Turning)
  질문에 응답하는 과정 중 고개를 1초간 돌리고 있을 경우 거짓말로 간주
- **눈 깜빡이기** (Blinking)
  [거짓말 심리학 中 - 눈을 자주 깜빡이는 사람은 거짓말쟁이?](https://blog.daum.net/nyscan/6094505)
  - 일반적인 사람의 평균 분당 깜빡임 횟수: 15~20회
  - 거짓말시 분당 깜빡임 횟수 3~5배로 증가
  - 직접 시험결과 분당 약 20회(거짓말 시 3배 적용): 20x3 = 60(분당) → 1초에 1번
  - 3초 이내에 3번 이상 깜빡일 경우 거짓말로 간주
- **눈 흘겨보기** (Gazing)
  질문에 응답하는 과정 중 0.5초간 눈동자만 다른 곳을 볼 경우 거짓말로 간주

## 3D 코 생성 및 길어지게 하기 (FaceFilter + Three.js)

- 거짓말 특징 포착 시 코 생성
  - **Three.js** Cylinder(원기둥) + Sphere(구) mesh 를 병합하여 피노키오 코 생성
- 거짓말 포착횟수 증가 시 코 길어지게 하기
  - **Facefilter** `destroy` 메소드로 라이브러리 re-rendering 후 코 길어지게 하기
- 3번 이상 포착 시 밀짚 모자 생성(피노키오st)

## 거짓말 특징 포착 시 캡쳐하기

- react-webcam `getScreenshot` 메소드 이용

## 랜덤 질문 & 카운트다운

- 20개의 질문 중 10개의 질문만 랜덤으로 추출하여 보여주기

  ```jsx
  useEffect(() => {
    while (randomQuestionList.length < TOTAL_QUESTIONS) {
      const randomQuestion = questionList.splice(
        Math.floor(Math.random() * questionList.length),
        1,
      )[0];

      randomQuestionList.push(randomQuestion);
    }
  }, []);
  ```

- HARDCORE 질문 선택하기

# 🔥 힘들었던 점

## Tensorflow

**머리와 얼굴의 거짓말 특징**을 포착하기 위해 2개의 라이브러리를 사용했습니다. 머리와 관련된 특징들은 `**faceapi.js**`(tensorflow 기반) 라이브러리를 사용했고, 눈과 관련된 특징들은 `**@tensorflow-models/face-landmarks-detection**` 라이브러리를 사용했습니다. `faceapi.js`의 keypoints(점)는 **68**개, `@tensorflow-models/face-landmarks-detection` 의 keypoints는 무려 **478**개로서 각 points의 좌표값(x, y)을 이용해서 얼굴의 특징을 잡아내야 했습니다. 이 특징들을 구현하기 위해 수학 공식(`Math.atan, Math.PI, Math.abs` 활용)과 다양한 메소드들을 사용해야 했고, 정말 머리가 지끈거리는 시간이였습니다.

특히, **홍채인식**을 할 수 있는 **face-landmakrs-detection 라이브러리**를 셋팅하고 작업을 할 때 였습니다.
홍채인식 관련하여 구글링을 했을 때 나오는 예시들은 `@tensorflow-models/face-landmarks-detection@**0.0.1**` 버전으로 홍채 좌표를 포함해 keypoints 478개를 사용하고 있었습니다. 그래서 저도 동일하게 같은 버전으로 작업을 하려고 하자 계속 알 수 없는 에러가 발생했습니다. 에러를 해결하기 위해 구글링을 해봐도 해결이 되지 않아, 어쩔 수 없이 최신 버전(`@tensorflow-models/face-landmarks-detection@**1.0.1**`)으로 바꾸었고 정상적으로 작동이 되었습니다. 하지만 다시 작업을 하며 콘솔을 찍어보니 keypoints가 468개만 찍히고 있었습니다. 나머지 10개(469 ~ 478)의 keypoints가 눈(홍채)과 관련된 좌표들이였는데, 아무리 검색을 해봐도 홍채 좌표를 얻을 수 없었습니다. 거의 몇일간 방황하다 지푸라기라도 잡는 심정으로 우연히 알게된 tensorflow runtime type(`mediapipe` or `tfjs`) 중 하나인 [mediapipe(구글팀) 사이트](https://google.github.io/mediapipe/solutions/face_mesh.html)에 들어가 꼼꼼히 읽어봤습니다. 그런데 처음보는 `refineLandmarks` 옵션이 있었습니다. 혹시나 하는 마음에 이 옵션을 `refineLandmarks: true` 로 설정하자 그토록 찾던 홍채 좌표가 나타났습니다. 고작 이 한 줄이 다였지만, 그때의 희열은 말로 이룰 수 없었습니다. 이 때의 경험으로 **라이브러리의 버전과 공식 문서**의 중요성을 다시 한번 느끼게 되었습니다.

## FaceFilter + Three.js

처음에 FaceFilter 라이브러리의 존재를 모르고 시도할 때는 기존의 라이브러리를 활용하고자 Tensorflow 모델의 nose keypoints를 이용해, Three.js로 만든 3D 모형을 해당 좌표에 띄워주면 되겠다고 쉽게 생각했었습니다. 그래서 먼저 `canvas`를 이용해 2D 사각형을 코에 그려봤습니다. 이렇게 시도를 했을 때 문제점은 얼굴인식이 100ms 마다 인식이 되기 때문에 2D 사각형이 `canvas`에 정말 자주 re-rendering 되어 그려지는 문제였습니다. 게다가 threejs를 이용하여 3D 모형을 webcam 위에 띄우는 것 조차 상상이 안됐습니다. 제가 원하는 그림은 얼굴인식은 자주 되면서 3D 모델은 자연스럽게 얼굴에 붙어있는 그림이였습니다. 이렇게 그려줄려면 3D 모델을 띄워줄 `canvas`가 더 필요하다고 생각해서 새로운 방법으로 작업을 시작했습니다. 하지만 다양한 방법으로 시도를 했으나 원하는 그림까지 도달하지 못했습니다.

시행착오 중에 Javascript 기반의 가장 유명한 [**FaceFilter 라이브러리**](https://github.com/jeeliz/jeelizFaceFilter)를 알게 되었습니다. 하지만 구글링을 해보니 국내 블로그에는 예시가 거의 없었고, 라이브러리를 적용하기까지의 진입장벽이 높았습니다. 또한 바닐라 JS 기반의 예시가 대부분이라 react에 맞게 적용하는것도 쉽지 않았습니다. 그래서 Github readme를 10번 넘게 읽어보면서 조금씩 적용을 해봤습니다. 먼저 2D 이미지를 얼굴에 띄우는 것을 시도해봤습니다. 라이브러리 사용법에 익숙해지면서 자체 메소드를 이용해 몇번의 시도 끝에 적용할 수 있었습니다. 어렵게만 느껴졌던 AR 기술을 직접 적용해보니 자신감이 생겼고, 이제 마지막 작업인 3D 띄우기를 쉽게 할 수 있겠다고 생각했습니다. 하지만 FaceFilter 자체도 무거운 라이브러리인데 여기다 또 무거운 Three.js 까지 더해지니 로직이 복잡했고 좀처럼 되지 않았습니다. 콘솔에는 3D 모형이 잘 찍히고 있었지만 화면에는 아무리 시도를 해도 띄울 수 없었습니다. 수많은 시도를 거듭하고 지쳐갈 때 쯤, Tensorflow에서 경험했던 버전 문제가 갑자기 떠올랐습니다. 버전을 비교해보니 제 버전은 `three@**0.142.0**` 이였고, 라이브러리 예시는 `three@**0.112.0**` 버전을 사용하고 있었습니다. 마이너 버전이 무려 30이나 차이가 나고 있었고, 설마하고 라이브러리를 재설치해서 실행해 보니.. 3D 모형이 화면에 바로 띄워졌습니다. Tensorflow에서 버전 문제로 그렇게 고생했는데도 같은 실수를 반복하는 저를 보고 자괴감을 느꼈습니다. 어떤 예시가 있을 때 꼭 버전을 확인하고 같은 환경으로 셋팅한 상태에서 적용을 해야 된다는 것을 뼈저리게 느꼈습니다. 또 코딩 실력은 이런 사소한 디테일에서 차이가 난다는 것을 알게 됐습니다.

# 🤸🏻‍♂️ **프로젝트를 마친 소감**

## “이봐, 해 봤어?”

개인 프로젝트를 시작하고 가장 많이 생각한 말은 ‘이게 가능할까?’ 였습니다. 기술조사만 하고 검증이 제대로 되지 않은 상태로 진행을 하니 막연함의 연속이였고, 새로운 기능의 큰 벽을 만날때마다 포기하고 싶었고 다른 쉬운 방법을 택하고 싶었습니다. 하지만 지금까지 달려온 길을 돌아보면서 마음을 다잡았습니다. 이후 끝까지 포기하지 않고 어떻게든 해결하겠다는 마음으로 특정 기능에 대해 치밀하게 조사를 했고, 또 수많은 시행착오를 거치며 해당 기능을 프로젝트에 결국 적용할 수 있었습니다. 이 경험으로 어떤 일이든 안 되는 건 없고, 그 일의 가능성은 내 마음먹기에 달려있다는걸 알게되면서 제 **가능성**을 확인할 수 있었습니다.

## 홀로서기

부트캠프 시작부터 팀 프로젝트까지는 모르는게 있거나 어려운 문제를 마주 했을 때 주변 사람의 도움을 받을 수 있었습니다. 당시 힘들어하던 저에게 이런 점들이 큰 위안이 되었습니다. 하지만 개인 프로젝트를 시작하자 사막 한 가운데 혼자 떨어져 있는 기분이였습니다. 어떠한 기준과 지표도 없이 프로젝트 기획, 디자인, 개발 등의 모든 의사결정을 혼자서 해야했고, 하루에 어느정도의 작업을 시작하고 끝내야할지를 계획하는 것도 쉽지 않았습니다. 하지만 점점 혼자 진행하는게 익숙해지면서 일련의 과정들이 체계적으로 하나씩 자리잡기 시작했습니다. 또한 문제를 해결하는 과정에서 리서치한 자료들을 더 꼼꼼히 보기 시작했고 이전에는 기피하던 영문 사이트 및 자료들이 눈에 더 잘 읽히기 시작했습니다. 이러한 과정 속에서 ‘나도 혼자 문제를 해결할 수 있구나'라는 생각이 들면서 개발자로 한 발자국 나아가는 느낌이 들었습니다. 또한 프로젝트를 처음부터 끝까지 혼자 마무리 했다는 것에 큰 **자신감**을 얻게 되었습니다.

## 새로운 시작

비록 개인 프로젝트를 끝으로 바닐라 코딩의 부트캠프 과정은 끝이 났지만, 이제부터가 **새로운 시작**이라고 생각합니다.
개발자가 되기까지의 과정이 정말 쉽지 않다는걸 몸소 느끼고 있습니다. 하지만 밤새가면서 하는데도 재미를 느끼게 되고 자고 일어나 눈을 부비며 바로 자리에 앉아 또 다시 작업을 하게 되는 코딩의 매력 때문에 이 길을 선택한 걸 후회하지 않습니다. 시간이 지날수록 배울 것도 많고 제 실력의 부족함을 많이 느끼지만, 이 부트캠프의 경험 덕분에 앞으로 새로운 것을 배울 때 제 태도는 막막함과 걱정이 앞서는 것이 아니라 오히려 기대와 설레임으로 바뀌게 된 것 같습니다. 특히 바닐라 코딩에서 좋은 분들과 함께 할 수 있어서 제가 여기까지 올 수 있었던 것 같습니다. 끝으로 자유롭지만 긴장의 끈을 놓지 않도록 작업 환경을 만들어준 ken님께도 감사드립니다.

배움을 게을리하지 않고 정진하여 많은 사람들에게 선한 영향력을 줄 수 있는 서비스를 제공하는 개발자가 되겠습니다.
