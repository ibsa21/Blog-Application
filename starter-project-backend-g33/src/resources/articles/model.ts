import IArticleInterface from "./interface";
import mongoose, {Schema} from 'mongoose';

const ArticleSchema : Schema = new Schema({

    title:{type: String, required: true},
    content : {type: String, required : true},
    Author: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    featuredImage: {type : String },
    tags: [{type: String }],
    clappers: [{type: Schema.Types.ObjectId }], 
    commentCount: {type : Number},
    },
    { timestamps: {createdAt: 'created_at', updatedAt: 'modified_at'}
});

ArticleSchema.set('toJSON',{virtuals: true})

export default mongoose.model<IArticleInterface>('Article', ArticleSchema);