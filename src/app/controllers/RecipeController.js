const Recipe = require('../models/Recipe');
const RecipeItem = require('../models/RecipeItem');
const Comment = require('../models/Comment');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../util/mongoose');
var today = new Date();

const COMMENT_PAGE_SIZE = 6;

class RecipeController {

    // [GET] /recipe
    index(req, res, next) {
        Recipe.find({})
            .then(recipes => {
                res.render('recipe/recipe', {
                    title: 'Công thức',
                    css: 'recipe.css',
                    recipes: multipleMongooseToObject(recipes),
                    message: req.flash('message'),
                })
            })
            .catch(next);
    }

    // [GET] /recipe/:slug
    show(req, res, next) {
        Recipe.findOne({ slug: req.params.slug })
            .then(recipe => {
                RecipeItem.find({ recipe: recipe.name })
                    .then(recipeItems => {
                        res.render('recipe/recipeDetail', {
                            title: 'Công thức',
                            css: 'recipe - detail.css',
                            recipe: mongooseToObject(recipe),
                            recipeItems: multipleMongooseToObject(recipeItems),
                            message: req.flash('message'),
                        })
                    })
            })
            .catch(next);
    }

    // [GET] /recipe/item/:slug
    post(req, res, next) {
        var page = req.query.page || 1;
        if (page) {
            // get page
            page = parseInt(page);
            if (page < 1) {
                page = 1;
            }
            var numberSkip = (page - 1) * COMMENT_PAGE_SIZE;

            Promise.all([RecipeItem.findOne({ slug: req.params.slug }),
                    Comment.find({ slug: req.params.slug })
                    .skip(numberSkip)
                    .limit(COMMENT_PAGE_SIZE)
                ])
                .then(([recipeItem, comments]) => {
                    Comment.find({ slug: req.params.slug }).countDocuments()
                        .then(total => {
                            var totalPage = Math.ceil(total / COMMENT_PAGE_SIZE);

                            res.render('recipe/recipePost', {
                                title: 'Công thức',
                                css: 'recipePost.css',
                                recipeItem: mongooseToObject(recipeItem),
                                comments: multipleMongooseToObject(comments),
                                message: req.flash('message'),
                                page, //current
                                totalPage, //pages
                            })
                        })
                })
        }
    }

    // [POST] /recipe/comment/:slug
    comment(req, res, next) {
        var formData = req.body;

        formData.slug = req.params.slug;
        formData.userName = req.session.authUser.userName;
        formData.avatar = req.session.authUser.avatar;
        formData.date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const comment = new Comment(formData);
        comment.save()
            .then(res.redirect('back'))
    }
}

module.exports = new RecipeController;