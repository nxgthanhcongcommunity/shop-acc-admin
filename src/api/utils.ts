
export const transformResponse = (response: any) => {
    if (response.status === 200 && response.data.succeed) {
        return {
            succeed: true,
            data: response.data.data,
        };
    }

    console.log("call api failed: ", response);
    return {
        succeed: false,
        data: null,
    };;
}