
export const transformResponse = (response: any) => {
    if (response.status === 200 && response.data.succeed) {
        return response.data.data;
    }
    console.log("call api failed: ", response);
    return null;
}