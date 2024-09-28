import { Comment } from './Comment';

export interface CommentFormProps {
    postId: string;
    onCommentSuccess: (comment: Comment) => void;
}
