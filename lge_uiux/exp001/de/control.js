// EXP001DE Control Group
console.log("EXP001DE - Control Group Loaded");

// 특정 노드가 DOM에 추가될 때까지 대기하는 함수
function observeNode(selector, rootNode = document.body) {
  return new Promise((resolve) => {
    const targetNode = rootNode.querySelector(selector);
    if (targetNode) {
      resolve(targetNode); // 노드가 이미 있으면 바로 반환
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      const node = rootNode.querySelector(selector);
      if (node) {
        resolve(node);
        obs.disconnect(); // 노드가 발견되면 관찰 중지
      }
    });

    observer.observe(rootNode, { childList: true, subtree: true });
  });
}

// .c-price-info__wrapper 요소의 존재 여부를 감지하고 실험을 실행하는 함수
function checkReadyStatus() {
  console.log(".c-price-info__wrapper 존재 여부를 확인합니다.");

  // .c-price-info__wrapper가 존재하는지 체크
  if (document.querySelector(".c-price-info__wrapper")) {
    console.log(".c-price-info__wrapper is present, executing experiment...");
    setTimeout(expStart, 100); // 실험 실행
    return; // 이미 실행했으므로 더 이상 감지할 필요 없음
  }

  // MutationObserver를 사용하여 .c-price-info__wrapper가 생기는 것을 감지
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList" || mutation.type === "subtree") {
        // .c-price-info__wrapper가 생겼는지 확인
        if (document.querySelector(".c-price-info__wrapper")) {
          console.log(".c-price-info__wrapper added, executing experiment...");
          setTimeout(expStart, 100); // 실험 실행
          observer.disconnect(); // 한 번 실행되면 더 이상 감지하지 않음
          break;
        }
      }
    }
  });

  // 자식 노드의 변화를 관찰
  observer.observe(document, {
    childList: true, // 자식 노드 변화를 감지
    subtree: true, // 하위 트리 전체를 관찰
  });
}

// 실험 시작 함수
function expStart() {
  // 여기에 실험 코드를 추가
  console.log("Experiment logic started");
  fireCustomEvent("uiux_exp001de_ctrl_started", "exp001de_ctrl");
}

// 페이지 로드 확인 및 시작
function startExperiment() {
  console.log("Starting experiment setup...");

  // 버튼이 lazy하게 로드될 수 있으므로, 버튼이 추가될 때까지 기다림
  observeNode('button[data-shop-stock-status="IN_STOCK"]', document.body).then(
    (buyNowButton) => {
      if (buyNowButton) {
        console.log(
          "Button with data-shop-stock-status='IN_STOCK' found, checking for .disabled class..."
        );
        checkReadyStatus();
      } else {
        console.log("Button with data-shop-stock-status='IN_STOCK' not found");
      }
    }
  );
}

function fireCustomEvent(eventName, param2, param3, param4, param5) {
  dataLayer.push({
    event: "custom_event",
    dynamic_param1: eventName,
    dynamic_param2: param2,
    dynamic_param3: param3,
    dynamic_param4: param4,
    dynamic_param5: param5,
  });
}

if (document.readyState === "complete") {
  console.log(
    "Document readyState is complete, calling the appropriate function"
  );
  startExperiment();
} else {
  console.log(
    "Document readyState is not complete, setting up DOMContentLoaded and load event listeners"
  );

  const onDOMContentLoaded = function () {
    console.log("DOMContentLoaded event fired");
    startExperiment();
    document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
    window.removeEventListener("load", onLoad);
  };

  const onLoad = function () {
    console.log("Window load event fired");
    startExperiment();
    document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
    window.removeEventListener("load", onLoad);
  };

  document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
  window.addEventListener("load", onLoad);
}
