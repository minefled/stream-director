import APIClient from "./api/APIClient";
import StreamDirectorElement from "./sdk/StreamDirectorElement";

const exports = {
    APIClient,
    StreamDirectorElement
};

export default exports;

declare global {
    interface Window {
        streamDirector: typeof exports;
    }
}