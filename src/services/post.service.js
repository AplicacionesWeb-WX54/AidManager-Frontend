import axios from "axios";
import {environment} from "@/environment/environment";

export class PostApiService {

    http = null;

    constructor() {
        this.http = axios.create({
            baseURL: environment.baseUrl
        })
    }

    async getAllPosts() {
        try {
            return await this.http.get(`posts`)
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    async getAllPostsByCompanyId(companyId, limit = 5) {
        try {
            const response = await this.http.get(`posts/company/${companyId}`, {
                params: {
                    _limit: limit
                }
            });
            return response;
        } catch (error) {
            console.error(`Error fetching posts for ${companyId}:`, error);
            throw error;
        }
    }

    async createNewPost(userId, companyId, post) {
        try {
            // adding the properties passed for param
            post.userId = userId;
            post.companyId = companyId;
            post.rating = 0;

            return await this.http.post(`posts`, post);
        } catch (error) {
            console.error(`Error creating post`, error);
            throw error;
        }
    }

    async updatePostRating(postId = 3, userId, rating) {
        try {
            return await this.http.patch(`posts/${postId}/rating`, {
                rating,
                userId
            });
        } catch (error) {
            console.error(`Error rating post`, error);
            throw error;
        }
    }

}