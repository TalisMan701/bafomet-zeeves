import * as axios from "axios"

const instance = () => axios.create({
	withCredentials: true,
	baseURL: `https://zeeves.wellbe.club/api/v1/`,
});

export const backAPI = {
	createImages(key, owner){
		return instance().post(`images/nft/create`, owner === undefined ? {key} : {key, owner})
	},
	updateStatus(id){
		return instance().get(`images/nft/${id}`)
	},
	getAllMyImages(owner){
		return instance().get(`images/nft/list?owner=${owner}`)
	}
}
