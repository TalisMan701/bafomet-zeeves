import * as axios from "axios"

const instance = () => axios.create({
	withCredentials: true,
	baseURL: `http://zeeves.wellbe.club/api/v1/`,
});

export const backAPI = {
	createImages(key, owner){
		return instance().post(`images/nft/create`, owner === undefined ? {key} : {key, owner})
	},
	updateStatus(id){
		return instance().get(`images/nft/${id}`)
	},

	getAllMyPicture(owner){
		return instance().get(`images/images/list?owner=${owner}`)
	},
	mintImage(image_id){
		return instance().get(`images/images/${image_id}/mint`)
	}
}
