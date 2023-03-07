class Comment {

    constructor(text){
        this.text = text;
        this.likesQuantity = 0
    }

    addLike(){
        this.likesQuantity += 1; //or this.likesQuantity = this.likesQuantity + 1;
    }

    static mergeComments(first, second){
        return `${first} + ${second}`
    }
    
}


const firstComment = new Comment('Text 1');
const secondComment = new Comment('Text 2');

let mergedText = Comment.mergeComments(firstComment.text, secondComment.text);

//console.log(mergedText);

firstComment.addLike();

let mergedText2 = firstComment.mergeComments('qwe', 'qwe')

console.log(mergedText2);
