// EXP001DE EXP Group
console.log("EXP001DE - EXP Group Loaded");

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
  fireCustomEvent("uiux_exp001de_exp_started", "exp001de_exp", "240920");

  // #PD0003SiblingOptions01 작업
  const parentElement01 = document.querySelector("#PD0003SiblingOptions01");

  if (parentElement01) {
    console.log("Found #PD0003SiblingOptions01");

    // 1. "checked" 클래스와 role="button" 속성을 가진 요소에 대한 작업
    const checkedTargetElements = Array.from(
      parentElement01.querySelectorAll(
        'div.checked[role="button"] > div.c-sibling-option__detail'
      )
    );

    checkedTargetElements.forEach((detailDiv) => {
      // 기존 SVG 제거
      const existingSVG = detailDiv.querySelector("svg");
      if (existingSVG) {
        console.log("Removing existing SVG in checked element");
        existingSVG.remove();
      }

      // 스타일 추가
      detailDiv.style.cssText =
        "display: flex; justify-content: start; flex-direction: row; align-items: center;";

      // SVG 생성 및 추가
      const svgHTML = `
        <svg width="20" height="20" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <circle cx="7.5" cy="8" r="7.5" fill="#EA1917"/>
            <circle cx="7.5" cy="8" r="7" fill="white" stroke="#EA1917"/>
            <circle cx="7.5" cy="8" r="4.28571" fill="#EA1917"/>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="15" height="15" y="0.5" fill="white"/>
            </clipPath>
          </defs>
        </svg>`;
      detailDiv.insertAdjacentHTML("afterbegin", svgHTML);

      // SVG의 바로 다음 요소 노드에 스타일 추가
      const nextElement = detailDiv.firstElementChild.nextElementSibling;
      if (nextElement) {
        nextElement.style.marginLeft = "10px";
      }
    });

    // 2. "aria-pressed=false"인 a 태그의 하위 요소에 대한 작업
    const ariaPressedFalseElements = Array.from(
      parentElement01.querySelectorAll(
        'a[role="button"][aria-pressed="false"] > div.c-sibling-option__detail'
      )
    );

    ariaPressedFalseElements.forEach((detailDiv) => {
      // 기존 SVG 제거
      const existingSVG = detailDiv.querySelector("svg");
      if (existingSVG) {
        existingSVG.remove();
      }

      // 스타일 추가
      detailDiv.style.cssText =
        "display: flex; justify-content: start; flex-direction: row; align-items: center;";

      // 자식 요소들을 하나의 div로 묶기
      const wrapperDiv = document.createElement("div");
      while (detailDiv.firstChild) {
        wrapperDiv.appendChild(detailDiv.firstChild);
      }
      detailDiv.appendChild(wrapperDiv);

      // SVG 생성 및 추가
      const svgHTML = `
        <svg width="20" height="20" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.544959" y="1.04496" width="13.9101" height="13.9101" rx="6.95504" stroke="#D4D4D4" stroke-width="1.08992"></rect>
        </svg>`;
      detailDiv.insertAdjacentHTML("afterbegin", svgHTML);

      // 감싼 div에 margin-left 추가
      wrapperDiv.style.marginLeft = "10px";
    });
  }

  // #PD0003SiblingOptions03 작업
  const parentElement03 = document.querySelector("#PD0003SiblingOptions03");

  if (parentElement03) {
    console.log("Found #PD0003SiblingOptions03");

    // div.c-sibling-option__primary-detail 요소를 선택
    const primaryDetailElements = Array.from(
      parentElement03.querySelectorAll("div.c-sibling-option__primary-detail")
    );

    primaryDetailElements.forEach((detailDiv) => {
      // 스타일 추가
      detailDiv.style.cssText =
        "display: flex; justify-content: start; flex-direction: row; align-items: center; gap: 0;";

      // 자식 요소들을 하나의 div로 묶기
      const wrapperDiv = document.createElement("div");
      while (detailDiv.firstChild) {
        wrapperDiv.appendChild(detailDiv.firstChild);
      }
      detailDiv.appendChild(wrapperDiv);

      const updateSVG = () => {
        // 기존 SVG 제거
        const existingSVG = detailDiv.querySelector("svg");
        if (existingSVG) {
          existingSVG.remove();
        }

        // 부모의 부모 노드에 "active" 클래스가 있는지 확인
        const parentNode = detailDiv.parentNode?.parentNode;
        if (parentNode && parentNode.classList.contains("active")) {
          // "active" 클래스가 있으면 첫 번째 SVG 생성
          const activeSvgHTML = `
            <svg width="20" height="20" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
                <circle cx="7.5" cy="8" r="7.5" fill="#EA1917"/>
                <circle cx="7.5" cy="8" r="7" fill="white" stroke="#EA1917"/>
                <circle cx="7.5" cy="8" r="4.28571" fill="#EA1917"/>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="15" height="15" y="0.5" fill="white"/>
                </clipPath>
              </defs>
            </svg>`;
          detailDiv.insertAdjacentHTML("afterbegin", activeSvgHTML);
        } else {
          // "active" 클래스가 없으면 두 번째 SVG 생성
          const inactiveSvgHTML = `
            <svg width="20" height="20" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.544959" y="1.04496" width="13.9101" height="13.9101" rx="6.95504" stroke="#D4D4D4" stroke-width="1.08992"></rect>
            </svg>`;
          detailDiv.insertAdjacentHTML("afterbegin", inactiveSvgHTML);
        }

        // 감싼 div에 스타일 추가
        wrapperDiv.style.marginLeft = "10px";
      };

      // 초기 SVG 설정
      updateSVG();

      // active 클래스 변경을 감지하여 SVG 업데이트
      const parentNode = detailDiv.parentNode?.parentNode;
      if (parentNode) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === "class") {
              updateSVG();
            }
          });
        });

        observer.observe(parentNode, {
          attributes: true,
        });
      }

      // .text 하위 노드에 스타일 추가
      const textElements = wrapperDiv.querySelectorAll(".text");
      textElements.forEach((textElement) => {
        textElement.style.display = "flex";
      });
    });
  }

  // #PD0003additionalservices 작업
  const parentElementAdditional = document.querySelector(
    "#PD0003additionalservices"
  );

  if (parentElementAdditional) {
    console.log("Found #PD0003additionalservices");
    parentElementAdditional.style.backgroundColor = "#e6e1d6";

    const primaryDetailElements = Array.from(
      parentElementAdditional.querySelectorAll(
        "div.c-sibling-option__primary-detail"
      )
    );

    primaryDetailElements.forEach((detailDiv) => {
      detailDiv.style.cssText =
        "display: flex; justify-content: start; flex-direction: column; align-items: start; margin-left: 10px; gap: 0;";
    });

    const optionDetailElements = Array.from(
      parentElementAdditional.querySelectorAll("div.c-sibling-option__detail")
    );

    optionDetailElements.forEach((detailDiv) => {
      detailDiv.style.cssText = "display: flex; align-items: center;";
    });

    const radioItems = Array.from(
      parentElementAdditional.querySelectorAll(".radio-item")
    );

    const updateSVGForRadioItem = (radioItem) => {
      const svgElement = radioItem.querySelector(
        ".c-sibling-option__detail svg"
      );
      const isActive = radioItem.classList.contains("active");

      const activeSvgHTML = `
        <svg width="20" height="20" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <circle cx="7.5" cy="8" r="7.5" fill="#EA1917"/>
            <circle cx="7.5" cy="8" r="7" fill="white" stroke="#EA1917"/>
            <circle cx="7.5" cy="8" r="4.28571" fill="#EA1917"/>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="15" height="15" y="0.5" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        `;

      const inactiveSvgHTML = `
      <svg width="20" height="20" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.544959" y="1.04496" width="13.9101" height="13.9101" rx="6.95504" stroke="#D4D4D4" stroke-width="1.08992"></rect>
        </svg>
    `;

      if (svgElement) {
        svgElement.remove(); // 기존 SVG 제거
      }

      const svgHTML = isActive ? activeSvgHTML : inactiveSvgHTML;
      radioItem
        .querySelector(".c-sibling-option__detail")
        .insertAdjacentHTML("afterbegin", svgHTML);

      // SVG에 클릭 이벤트 추가
      const newSvgElement = radioItem.querySelector(
        ".c-sibling-option__detail svg"
      );
      if (newSvgElement) {
        newSvgElement.addEventListener("click", (event) => {
          event.stopPropagation(); // 이벤트 전파 중지
          console.log(
            "SVG clicked, triggering parent .c-sibling-option__detail click event."
          );
          radioItem.querySelector(".c-sibling-option__detail").click(); // 부모의 .c-sibling-option__detail 클릭 트리거
        });
      }
    };

    const manageActiveClass = () => {
      const installationItem = Array.from(
        parentElementAdditional.querySelectorAll(".radio-item")
      ).find((item) => {
        const cmpText = item.querySelector(".cmp-text");
        return (
          cmpText &&
          cmpText.textContent.includes("Installation") &&
          !cmpText.textContent.includes("Ohne Installation")
        );
      });

      const ohneInstallationItem = Array.from(
        parentElementAdditional.querySelectorAll(".radio-item")
      ).find((item) => {
        const cmpText = item.querySelector(".cmp-text");
        return cmpText && cmpText.textContent.includes("Ohne Installation");
      });

      const altItem = Array.from(
        parentElementAdditional.querySelectorAll(".radio-item")
      ).find((item) => {
        const cmpText = item.querySelector(".cmp-text");
        return (
          cmpText &&
          cmpText.textContent.includes("Altgerätmitnahme") &&
          !cmpText.textContent.includes("Ohne Altgerätmitnahme")
        );
      });

      const ohneAltItem = Array.from(
        parentElementAdditional.querySelectorAll(".radio-item")
      ).find((item) => {
        const cmpText = item.querySelector(".cmp-text");
        return cmpText && cmpText.textContent.includes("Ohne Altgerätmitnahme");
      });

      setTimeout(() => {
        if (installationItem && ohneInstallationItem) {
          if (installationItem.classList.contains("active")) {
            ohneInstallationItem.classList.remove("active");
          } else {
            ohneInstallationItem.classList.add("active");
          }
        }

        if (altItem && ohneAltItem) {
          if (altItem.classList.contains("active")) {
            ohneAltItem.classList.remove("active");
          } else {
            ohneAltItem.classList.add("active");
          }
        }
      }, 0);
    };

    const triggerOtherActiveDetailClicks = (ohneItem) => {
      const isOhneInstallation =
        ohneItem.querySelector(".cmp-text")?.innerText === "Ohne Installation";
      const isOhneAlt =
        ohneItem.querySelector(".cmp-text")?.innerText ===
        "Ohne Altgerätmitnahme";

      if (!ohneItem.classList.contains("active")) {
        let activeItems = [];

        if (isOhneInstallation) {
          // "Ohne Installation" 클릭 시 Installation 관련 active 버튼만 처리
          activeItems = Array.from(
            parentElementAdditional.querySelectorAll(".radio-item.active")
          ).filter((item) => {
            const cmpText = item.querySelector(".cmp-text");
            return cmpText && cmpText.innerText.includes("Installation");
          });
        } else if (isOhneAlt) {
          // "Ohne Altgerätmitnahme" 클릭 시 Altgerätmitnahme 관련 active 버튼만 처리
          activeItems = Array.from(
            parentElementAdditional.querySelectorAll(".radio-item.active")
          ).filter((item) => {
            const cmpText = item.querySelector(".cmp-text");
            return cmpText && cmpText.innerText.includes("Altgerätmitnahme");
          });
        }

        if (activeItems) {
          activeItems.forEach((activeItem) => {
            if (activeItem !== ohneItem) {
              const siblingDetail = activeItem.querySelector(
                ".c-sibling-option__detail"
              );
              console.log(
                `Triggering click event on active item:`,
                siblingDetail
              );
              siblingDetail.click(); // 해당 active 상태의 버튼만 클릭 이벤트 트리거
            }
          });
        }
      }
    };

    // 기존 toggleActiveClassOnClick 함수 유지
    const toggleActiveClassOnClick = (radioItem) => {
      const siblingDetail = radioItem.querySelector(
        ".c-sibling-option__detail"
      );

      siblingDetail.addEventListener("click", () => {
        console.log("Clicked on:", siblingDetail);
        manageActiveClass();
        updateSVGForRadioItem(radioItem);

        const isOhneInstallation =
          siblingDetail.querySelector(".cmp-text")?.innerText ===
          "Ohne Installation";
        const isOhneAlt =
          siblingDetail.querySelector(".cmp-text")?.innerText ===
          "Ohne Altgerätmitnahme";

        if (isOhneInstallation || isOhneAlt) {
          triggerOtherActiveDetailClicks(radioItem);
        }
      });

      // SVG 클릭 시 상위 .c-sibling-option__detail 클릭 트리거
      const svgElement = siblingDetail.querySelector("svg");
      if (svgElement) {
        svgElement.addEventListener("click", (event) => {
          event.stopPropagation(); // 이벤트 전파 중지
          console.log(
            "SVG clicked, triggering parent .c-sibling-option__detail click event."
          );
          siblingDetail.click(); // 부모의 .c-sibling-option__detail 클릭 트리거
        });
      }
    };

    const observeRadioItem = (radioItem) => {
      const observer = new MutationObserver(() => {
        console.log(
          "Mutation detected: Updating SVG for radio-item:",
          radioItem
        );
        updateSVGForRadioItem(radioItem);
      });

      observer.observe(radioItem, {
        attributes: true,
        attributeFilter: ["class"],
      });

      console.log(
        "Started observing class attribute changes for radio-item:",
        radioItem
      );
    };

    radioItems.forEach((radioItem) => {
      updateSVGForRadioItem(radioItem);
      observeRadioItem(radioItem);
      toggleActiveClassOnClick(radioItem);
    });

    const altLabels = Array.from(
      parentElementAdditional.querySelectorAll('[id*="Altgerätmitnahme"]')
    );
    altLabels.forEach((altLabel) => {
      const radioItem = altLabel.closest(".radio-item");
      if (radioItem) {
        if (!radioItem.previousElementSibling) {
          radioItem.insertAdjacentHTML(
            "beforebegin",
            '<div class="c-sibling-option-box__option-title">Altgerätmitnahme</div>'
          );
        }
        updateSVGForRadioItem(radioItem);

        const existingAltButton =
          radioItem.previousElementSibling?.querySelector(".cmp-text");
        if (
          !existingAltButton ||
          existingAltButton.innerText !== "Ohne Altgerätmitnahme"
        ) {
          const buttonHTML = `
          <div class="c-sibling-option radio-item active" role="checkbox" tabindex="0">
            <div class="c-sibling-option__detail option-red" style="display: flex;justify-content: start;flex-direction: row;align-items: center;gap: 0px;padding-top: 20px;padding-bottom: 20px;">
              <svg width="20" height="20" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                    <circle cx="7.5" cy="8" r="7.5" fill="#EA1917"/>
                    <circle cx="7.5" cy="8" r="7" fill="white" stroke="#EA1917"/>
                    <circle cx="7.5" cy="8" r="4.28571" fill="#EA1917"/>
                </g>
                <defs>
                    <clipPath id="clip0">
                    <rect width="15" height="15" y="0.5" fill="white"/>
                    </clipPath>
                </defs>
                </svg>
              <div class="c-sibling-option__primary-detail" style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 10px; gap: 0;">
                <div class="c-sibling-option__definition">
                  <div class="text c-sibling-option__name">
                    <span class="cmp-text">Ohne Altgerätmitnahme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
          radioItem.insertAdjacentHTML("beforebegin", buttonHTML);

          const newAltButton = radioItem.previousElementSibling;
          observeRadioItem(newAltButton); // 새로 추가된 "Ohne Altgerätmitnahme"에 대한 observer 설정
          toggleActiveClassOnClick(newAltButton); // 클릭 이벤트 설정
        }
      }
    });

    // Installation에 대한 처리
    const installationLabels = Array.from(
      parentElementAdditional.querySelectorAll('[id*="Installation"]')
    );
    installationLabels.forEach((installationLabel) => {
      const radioItem = installationLabel.closest(".radio-item");
      if (radioItem) {
        updateSVGForRadioItem(radioItem);

        const existingInstallButton =
          radioItem.previousElementSibling?.querySelector(".cmp-text");
        if (
          !existingInstallButton ||
          existingInstallButton.innerText !== "Ohne Installation"
        ) {
          const buttonHTML = `
          <div class="c-sibling-option radio-item active" role="checkbox" tabindex="0">
            <div class="c-sibling-option__detail option-red" style="display: flex;justify-content: start;flex-direction: row;align-items: center;gap: 0px;padding-top: 20px;padding-bottom: 20px;">
              <svg width="20" height="20" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                    <circle cx="7.5" cy="8" r="7.5" fill="#EA1917"/>
                    <circle cx="7.5" cy="8" r="7" fill="white" stroke="#EA1917"/>
                    <circle cx="7.5" cy="8" r="4.28571" fill="#EA1917"/>
                </g>
                <defs>
                    <clipPath id="clip0">
                    <rect width="15" height="15" y="0.5" fill="white"/>
                    </clipPath>
                </defs>
                </svg>
              <div class="c-sibling-option__primary-detail" style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 10px; gap: 0;">
                <div class="c-sibling-option__definition">
                  <div class="text c-sibling-option__name">
                    <span class="cmp-text">Ohne Installation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
          radioItem.insertAdjacentHTML("beforebegin", buttonHTML);

          const newInstallButton = radioItem.previousElementSibling;
          observeRadioItem(newInstallButton); // 새로 추가된 "Ohne Installation"에 대한 observer 설정
          toggleActiveClassOnClick(newInstallButton); // 클릭 이벤트 설정
        }
      }
    });
  }

  // 세 개의 parentElement를 처리하는 함수
  function updateCmpText(parentElement) {
    if (parentElement) {
      console.log(`Found parent element: ${parentElement.id}`);

      // "0,00"이 포함된 .cmp-text 노드를 찾아 innerText를 "kostenlos"로 바꾸고 스타일 추가
      const cmpTextNodes = Array.from(
        parentElement.querySelectorAll(".cmp-text")
      );

      cmpTextNodes.forEach((cmpTextNode) => {
        if (cmpTextNode.innerText.includes("0,00")) {
          console.log(
            "Found .cmp-text containing '0,00', updating text and style"
          );
          cmpTextNode.innerText = "kostenlos";
          cmpTextNode.style.color = "#EA1917"; // 인라인으로 색상 스타일 추가
        }
      });
    }
  }

  // 각 parentElement에 대해 처리
  updateCmpText(parentElement01);
  updateCmpText(parentElement03);
  updateCmpText(parentElementAdditional);

  // // Installation 및 Altgerätmitnahme 버튼을 클릭하여 active 상태로 만드는 함수
  // function activateInitialButtons() {
  //   const installationItem = Array.from(
  //     document.querySelectorAll(".radio-item")
  //   ).find((item) => {
  //     const cmpText = item.querySelector(".cmp-text");
  //     return cmpText && cmpText.innerText.includes("Installation");
  //   });

  //   const altItem = Array.from(document.querySelectorAll(".radio-item")).find(
  //     (item) => {
  //       const cmpText = item.querySelector(".cmp-text");
  //       return cmpText && cmpText.innerText.includes("Altgerätmitnahme");
  //     }
  //   );

  //   // 300ms 딜레이를 두고 버튼 클릭 처리
  //   if (installationItem && !installationItem.classList.contains("active")) {
  //     setTimeout(() => {
  //       console.log("Clicking Installation button to activate");
  //       const installationDetail = installationItem.querySelector(
  //         ".c-sibling-option__detail"
  //       );
  //       if (installationDetail) {
  //         installationDetail.click(); // 클릭하여 active 상태로 만듦
  //       }
  //     }, 300);
  //   }

  //   if (altItem && !altItem.classList.contains("active")) {
  //     setTimeout(() => {
  //       console.log("Clicking Altgerätmitnahme button to activate");
  //       const altDetail = altItem.querySelector(".c-sibling-option__detail");
  //       if (altDetail) {
  //         altDetail.click(); // 클릭하여 active 상태로 만듦
  //       }
  //     }, 600);
  //   }
  // }

  // activateInitialButtons(); // 추가된 부분
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
