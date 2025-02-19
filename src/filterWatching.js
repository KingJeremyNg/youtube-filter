function splitAtIndex(value, index) {
    return [Number(value.substring(0, index)), value.substring(index)];
}

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

waitForElements("#contents > ytd-compact-video-renderer > #dismissible").then(() => {
    setInterval(() => {
        let elements = document.querySelectorAll("[id=dismissible]");
        elements.forEach((element) => {
            // Remove short form videos
            let time = element.querySelector("#time-status > span")?.innerHTML.trim().split(":").map((str) => Number(str));
            if (time && time[0] == 0) {
                element.parentNode.remove();
                return;
            }

            // Remove low view count videos
            let views = element.querySelector("#metadata > #metadata-line > span")?.innerHTML.split(" ");
            if (views) {
                let [value, measure] = splitAtIndex(views[0], views[0].length - 1);
                if (!["K", "M", "B"].includes(measure)) {
                    element.parentNode.remove();
                    return;
                }
            }

            // Remove already watched videos
            let watchedProgress = element.querySelector("#overlays > ytd-thumbnail-overlay-resume-playback-renderer > #progress")?.getAttribute("style");
            if (watchedProgress) {
                element.parentNode.remove();
                return;
            }
        })
    }, 500);
});