const HTTP_STATUS = require("../httpStatusCodes/codes");
const axios = require("axios");
const IP = require("request-ip");
const Post = require("../model/Post");
const Search = require("../model/Search");

class PostController {
    async getPostByKeyword(req, res) {

        // console.log("I am from postcontroller search");

        try {
            let { keyword } = req.query;
            keyword = keyword?.toLowerCase()?.trim();

            //console.log("keyword=", keyword);

            if (keyword == "") {

                const status = HTTP_STATUS.UNPROCESSABLE_ENTITY;
                const response = {};

                response.success = false;
                response.message = "The keyword can't be empty";

                return res.status(status).send(response);

            }

            let url = `https://jsonplaceholder.typicode.com/posts`;
            let posts;

            try {
                const response = await axios.get(url);

                // console.log(response);

                if (response.status !== 200) {
                    const status = HTTP_STATUS.UNPROCESSABLE_ENTITY;
                    const response = {};

                    response.error = true;
                    response.message = "Failed to fetch the posts data";

                    return res.status(status).send(response);

                }

                posts = response?.data;

            } catch (err) {
                const status = HTTP_STATUS.NOT_FOUND;
                const response = {};

                response.error = err;
                response.message = "Post Fetching error ";

                return res.status(status).send(response);

            }

            //console.log(posts);

            const matchedPosts = [];

            let data = posts?.filter((post) => {
                if (post?.title?.toLowerCase()?.includes(keyword) || post?.body?.toLowerCase()?.includes(keyword)) {
                    //console.log(post);
                    matchedPosts.push({
                        updateOne: {
                            upsert: true,
                            filter: { id: post?.id },
                            update: { $set: post },
                        },
                    });

                    return post;
                }
            });

            //console.log(matchedPosts.length);

            const result = await Post.bulkWrite(matchedPosts);

            // console.log("result == ", result);

            const foundedPosts = await Post.find({
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { body: { $regex: keyword, $options: "i" } },
                ],
            });

            const matchedIds = foundedPosts.map((post) => String(post?._id));

            await Search.create({
                ipAddress: IP.getClientIp(req),
                keyword,
                searchResult: matchedIds,
            });

            //console.log("data == ", data);

            let postResult = {
                posts: data,
                postCount: data.length,
            };

            const status = HTTP_STATUS.OK;
            const response = {};

            response.success = true;
            response.data = postResult
            response.message = "Successfully loaded the posts";

            return res.status(status).send(response);

        } catch (err) {
            // console.log(err);

            const status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
            const response = {};

            response.error = err;
            response.message = "Internal server error";

            return res.status(status).send(response);

        }
    }
}
module.exports = new PostController();
