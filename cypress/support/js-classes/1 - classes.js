class Comment {

    constructor(text){
        this.text = text;
        this.likesQuantity = 0
    }

    addLike(){
        this.likesQuantity += 1; //or this.likesQuantity = this.likesQuantity + 1;
    }

}

const firstComment = new Comment('This is comment 1 text');

// console.log(firstComment);
// console.log(firstComment.likesQuantity);



// console.log(firstComment);
// console.log(firstComment.likesQuantity);

const secondComment = new Comment('This is comment 2 text');
const thirdComment = new Comment('This is comment 3 text');

firstComment.addLike();
// console.log(firstComment);
// console.log(secondComment);
// console.log(thirdComment);

secondComment.addLike();
console.log(firstComment);
console.log(secondComment);
console.log(thirdComment);

