const waitForElements = (elements) => {
    return new Promise((resolve, reject) => {
        const intervalID = setInterval(() => {
            if (document.querySelector(elements)) {
                clearInterval(intervalID);
                resolve();
            }
        }, 500);
    })
};