import axios from "axios";

export const BASE_URL = "https://picsum.photos/";
axios.defaults.baseURL = BASE_URL;

export const DIRECTION_NEXT = "next";
export const DIRECTION_PREVIOUS = "previous";
export const DIRECTION_CLICK = "click";
