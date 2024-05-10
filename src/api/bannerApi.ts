import { IBanner } from "../models";
import axiosInstance from "./axiosInstance"

const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
}

const bannerApi = {

    async getBanners(queryConfig: any) {
        const response = await axiosInstance({
            method: METHODS.GET,
            url: "banner/get-banners",
            params: queryConfig
        })
        return response;
    },

    async AddBanner(banner: IBanner) {
        const response = await axiosInstance({
            method: METHODS.POST,
            url: "banner/add-banner",
            data: banner,
        })
        return response;
    },

    async UpdateBanner(banner: IBanner) {
        const response = await axiosInstance({
            method: METHODS.PUT,
            url: "banner/update-banner",
            data: banner,
        })
        return response;
    },

    async DeleteBanner(banner: IBanner) {
        const response = await axiosInstance({
            method: METHODS.DELETE,
            url: "banner/delete-banner",
            data: banner,
        })
        return response;
    }
}

export default bannerApi;

/*

useEffect(() => {
        axiosInstance.get("http://localhost:3003/api/v1/banner/get-banners");
    }, [])

*/