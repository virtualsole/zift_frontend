export const walletShortFormer = (wallet) => {
    return `${wallet?.slice(0, 7)}...${wallet?.slice(wallet?.length - 5, wallet?.length)}`
}
export const baseUrl = "https://server.heed3patti.com/api"