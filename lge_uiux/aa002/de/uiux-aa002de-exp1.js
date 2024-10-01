// AA002DE EXP 1 Group
console.log("AA002DE - EXP 1 Group Loaded");

window.expInfo = "AA002DE_exp1";

async function expStart() {
    console.log("expStart() called");
    fireCustomEvent("uiux_AA002DE_exp1_started", "AA002DE_exp1");
}

function fireCustomEvent(eventName, param2, param3, param4, param5) {
    dataLayer.push({
        event: "custom_event",
        dynamic_param1: eventName,
        dynamic_param2: param2,
        dynamic_param3: param3,
        dynamic_param4: param4,
        dynamic_param5: param5
    });
}

// 페이지 로드 확인 및 시작
if (document.readyState === 'complete') {
    console.log("Document readyState is complete, calling the appropriate function based on URL");
    expStart();
} else {
    console.log("Document readyState is not complete, setting up DOMContentLoaded and load event listeners");

    const onDOMContentLoaded = function() {
        console.log("DOMContentLoaded event fired");
        expStart();
        document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
        window.removeEventListener('load', onLoad);
    };

    const onLoad = function() {
        console.log("Window load event fired");
        expStart();
        document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
        window.removeEventListener('load', onLoad);
    };

    document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
    window.addEventListener('load', onLoad);
}
