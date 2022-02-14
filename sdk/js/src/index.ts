import APIClient from "./api/APIClient";

const exports = {
    APIClient
};

export default exports;

declare global {
    interface Window {
        streamDirector: typeof exports;
    }
}