import mongoose from 'mongoose';
import {Request, Response} from 'express';
import {Article} from '../models/article';


export const getMany = async (req: Request, res: Response) => {
    const article  = await Article.find();
    res.send(article);
}

export const getOne = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('Article not found');

    res.send(article);
}

export const createArticle = async(req: Request, res: Response) => {
    try{
        let article = new Article({
            Author: req.body.Author,
            Content: req.body.Content,
            Rating: req.body.Rating,
            Comment: req.body.Comment,
            postDate: req.body.postDate
        });
    
        await article.save();
    }catch(err){
        return res.status(404);
    }
}

export const updateOne = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

    let article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('Article not found');

    article.set({
        Author: req.body.Author,
        Content: req.body.Content,
        Rating: req.body.Rating,
        Comment: req.body.Comment,
        postDate: req.body.postDate
    });

    article = await article.save()
        .then(() => res.status(200).send(article))
        .catch((err: Error) => res.status(400).send(err.message));

}

export const deleteOne = async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');

    const article = await Article.findByIdAndRemove(req.params.id);
    if (!article) return res.status(404).send('Article not found');

    res.send(article);
}
