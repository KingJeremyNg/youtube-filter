const observeNavigation = (interval, url) => {
    let bodyList = document.querySelector("body");
    let observer = new MutationObserver(function (mutations) {
        if (url != document.location.href) {
            url = document.location.href;
            clearInterval(interval);
        }
    });
    let config = {
        childList: true,
        subtree: true,
    };
    observer.observe(bodyList, config);
}