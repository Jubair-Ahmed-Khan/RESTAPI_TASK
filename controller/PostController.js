class PostController {
    async getPostByKeyword(req, res) {
        console.log("I am from postcontroller search");
    }
}
module.exports = new PostController();
