import axiosInstance from "./axiosInstance"

const bannerApi = {

    async getBanners() {
        const response = await axiosInstance({
            method: "GET",
            url: "banner/get-banners",
        })
        return response;
    },
}

export default bannerApi;

/*

useEffect(() => {
        axiosInstance.get("http://localhost:3003/api/v1/banner/get-banners");
    }, [])

*/